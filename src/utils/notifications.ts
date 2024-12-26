export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const showNotification = (title: string, body: string) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body,
      icon: "/vite.svg",
      silent: false,
    });

    
    setTimeout(() => notification.close(), 5000);
  }
};