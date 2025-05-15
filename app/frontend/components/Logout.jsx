import { router } from "@inertiajs/react";

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
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}
