'use client'


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-screen h-screen ">
      {children}
    </div>
  )
}