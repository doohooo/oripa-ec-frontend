interface RarityBadgeProps {
  rarity?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const VALID_RARITIES = ["MUR", "MA", "SAR", "AR", "SR", "SSR", "RR", "R", "U", "C", "ACE", "BWR", "S"]

function normalizeRarity(rarity?: string): string {
  if (!rarity) return "C"
  const upper = rarity.toUpperCase()
  return VALID_RARITIES.includes(upper) ? upper : "C"
}

function getRarityStyle(rarity: string) {
  const styles: Record<string, { bg: string; text: string }> = {
    MUR: { bg: "bg-purple-900", text: "text-white" },
    MA: { bg: "bg-slate-900", text: "text-white" },
    BWR: { bg: "bg-gray-800", text: "text-white" },
    SAR: { bg: "bg-orange-200", text: "text-gray-900" },
    AR: { bg: "bg-blue-200", text: "text-gray-900" },
    SR: { bg: "bg-yellow-200", text: "text-gray-900" },
    SSR: { bg: "bg-pink-200", text: "text-gray-900" },
    RR: { bg: "bg-red-200", text: "text-gray-900" },
    R: { bg: "bg-amber-100", text: "text-gray-900" },
    U: { bg: "bg-green-100", text: "text-gray-900" },
    C: { bg: "bg-gray-200", text: "text-gray-900" },
    ACE: { bg: "bg-indigo-200", text: "text-gray-900" },
    S: { bg: "bg-teal-200", text: "text-gray-900" },
  }
  return styles[rarity] || styles.C
}

export function RarityBadge({ rarity, size = "md", className = "" }: RarityBadgeProps) {
  const normalizedRarity = normalizeRarity(rarity)
  const style = getRarityStyle(normalizedRarity)

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold shadow-md ${style.bg} ${style.text} ${sizeClasses[size]} ${className}`}
    >
      {normalizedRarity}
    </span>
  )
}
