<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep public navigation in `src/lib/site-nav.ts` so header and footer share the same valid destinations.
- Keep future follow-up timing in `src/lib/planned-follow-up.ts` as an editorial specification only, never as an active scheduler; the housing service is not implemented.
