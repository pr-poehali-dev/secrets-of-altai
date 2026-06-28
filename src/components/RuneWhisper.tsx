export default function RuneWhisper({ rune, hint }: { rune: string; hint: string }) {
  return (
    <span className="rune-whisper" tabIndex={0} role="note" aria-label={hint}>
      {rune}
      <span className="rune-whisper__tip">{hint}</span>
    </span>
  );
}
