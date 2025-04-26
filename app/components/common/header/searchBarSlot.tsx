"use client";

import React, { useEffect, useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Typography,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Search01Icon } from "hugeicons-react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export default function SearchBarSlot() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const router = useRouter();

  const highlightMatch = (text: string, match: string) => {
    const index = text.toLowerCase().indexOf(match.toLowerCase());
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <strong>{text.substring(index, index + match.length)}</strong>
        {text.substring(index + match.length)}
      </>
    );
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const query = searchTerm.trim().toLowerCase();

    const debounceTimer = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/data/products?search=${query}`);
          const data: Product[] = await response.json();

          const filtered = data
            .sort((a, b) => {
              const aStarts = a.title.toLowerCase().startsWith(query);
              const bStarts = b.title.toLowerCase().startsWith(query);
              return aStarts === bStarts ? 0 : aStarts ? -1 : 1;
            })
            .slice(0, 5);

          setSuggestions(filtered);
          setShowDropdown(true);
          setHighlightedIndex(-1);
        } catch (error) {
          console.error("Error fetching product suggestions:", error);
          setSuggestions([]);
          setShowDropdown(false);
        }
      };

      fetchData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSearch = () => {
    const query = searchTerm.trim();
    if (query) {
      setShowDropdown(false);
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSelect = (productTitle: string) => {
    setSearchTerm(productTitle);
    setShowDropdown(false);

    // ✅ Send only last keyword from title like "Headphones"
    const keyword = productTitle.split(" ").pop() || productTitle;
    router.push(`/products?search=${encodeURIComponent(keyword)}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSelect(suggestions[highlightedIndex].title);
        } else {
          handleSearch(); // ✅ When typed manually, allow full fuzzy match
        }
        break;

      case "Escape":
        setShowDropdown(false);
        break;
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
      <Box position="relative" width={{ xs: "100%", sm: 300 }}>
        <Paper
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          sx={{
            p: "2px 8px",
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            backgroundColor: "#f1f3f4",
            boxShadow: "none",
          }}
        >
          <IconButton onClick={handleSearch} sx={{ p: "5px" }}>
            <Search01Icon size={18} />
          </IconButton>
          <InputBase
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ ml: 1, flex: 1, fontSize: "0.9rem" }}
          />
        </Paper>

        {showDropdown && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              bgcolor: "#fff",
              border: "1px solid #ddd",
              borderRadius: 1.5,
              boxShadow: 4,
              zIndex: 1300,
              maxHeight: 240,
              overflowY: "auto",
              mt: 1,
            }}
          >
            {suggestions.length > 0 ? (
              <List dense disablePadding>
                {suggestions.map((item, index) => (
                  <ListItemButton
                    key={item.id}
                    onClick={() => handleSelect(item.title)}
                    selected={index === highlightedIndex}
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      backgroundColor:
                        index === highlightedIndex ? "#e3f2fd" : "transparent",
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "0.95rem" }}
                        >
                          {highlightMatch(item.title, searchTerm)}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {item.description
                            ? item.description.length > 100
                              ? item.description.slice(0, 100) + "..."
                              : item.description
                            : "No description available"}
                          {" • ₹" + item.price.toLocaleString()}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            ) : (
              <Box px={2} py={1}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  No products found.
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
