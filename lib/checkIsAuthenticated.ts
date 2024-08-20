import getSession from "./getSession";

export default async function checkIsAuthenticated() {
  const session = await getSession();
  if (!session) {
    return false;
  }
  return true;
}
