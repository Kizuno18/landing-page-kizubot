# Video metadata and transcripts

The allowlist remains `public/video-urls.txt`. Dedicated watch pages use the public YouTube title, publication date and captions when available. No publication date, rating or transcript is fabricated. Failed metadata requests do not take down the site. Pages without a verified title are `noindex`; VideoObject is emitted only with a real title and upload date.

To provide reviewed metadata for a video you own or have permission to republish, create `content/videos/VIDEO_ID.json` with `title`, `description`, `uploadDate` (the real ISO publication date), `transcriptLanguage` (for example `pt-BR`) and `transcript`, an array of `{ "seconds": 0, "text": "Actual reviewed words from the video" }`. Replace that example text with the actual transcription; do not publish placeholders. The filename must match an ID in the allowlist. Reviewed fields override remote metadata.

Public captions can be missing or inaccessible from the hosting provider. In that case the watch page explicitly reports that no transcript is available. Adding verified transcripts requires the original captions or audio; code alone cannot truthfully replace them.
