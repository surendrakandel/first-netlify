export async function sleep(ms: number): Promise<void> {
  await new Promise((resolveFunc) => setTimeout(resolveFunc, ms));
}
