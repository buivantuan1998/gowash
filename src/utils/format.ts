export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
  }).format(price);
}

export function formatDateTime(date: any) {
  let newDate = new Date(date);

  let year = newDate.getFullYear();
  let month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  let day = String(newDate.getDate()).padStart(2, '0');
  let hours = String(newDate.getHours()).padStart(2, '0');
  let minutes = String(newDate.getMinutes()).padStart(2, '0');
  let seconds = String(newDate.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



