export async function fetchGreeting(): Promise<string> {
  // デモ用の擬似API
  await new Promise((r) => setTimeout(r, 200))
  return 'こんにちは！擬似APIからのメッセージです。'
}


