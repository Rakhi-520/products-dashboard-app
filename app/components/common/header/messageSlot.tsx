import MessagesItems from "@app/placeholders/latestMessages.json";
import Notify from "./notify/notify";

export default function MessagesSlot() {
  return (
    <>
      <Notify variant="Messages" data={MessagesItems} />
    </>
  );
}
