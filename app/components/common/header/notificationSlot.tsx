import NotificationItems from "@app/placeholders/latestNotifications.json";
import Notify from "./notify/notify";

export default function NotificationSlot() {
  return (
    <>
      <Notify variant="Notifications" data={NotificationItems} />
    </>
  );
}
