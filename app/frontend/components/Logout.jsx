import { router } from "@inertiajs/react";
import "../styles/theme.css";

export default function Logout() {
  const handleLogout = () => {
    router.delete("/logout", {
      preserveScroll: true,
      onSuccess: () => {
        router.visit("/");
      },
    });
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
}
