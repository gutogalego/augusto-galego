import { redirect } from 'next/navigation'

// This page only renders when the app is built statically (output: 'export')
// Redirect to the default locale
export default function RootPage() {
  redirect('/pt')
}
