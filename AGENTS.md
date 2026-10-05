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

- Keep the first-phase catalog in a shared typed module and use CDN asset pointers for downloaded product images, so the storefront can later move to persistent storage without changing page layouts.
- Share transient bag and wishlist state through a storefront provider until a backend is connected, so navigation works without implying orders or checkout persist.
