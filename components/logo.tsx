export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="/logo.jpg" alt="AKIHABARA TCG SHOP" className="h-10 w-auto" />
    </div>
  )
}
