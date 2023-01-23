interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 mt-4 w-60">
      <div
        role="progressbar"
        aria-label='Progresso'
        aria-valuenow={props.progress}
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={{ width: `${props.progress}%` }}
      />
    </div>
  )
}