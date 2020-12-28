export async function loadUsers() {
  const response = await fetch('api/users');
  if (!response.ok) {
    return [];
  }
  return response.json();
}
