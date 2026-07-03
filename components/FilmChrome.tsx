const STAMP = "'26 7 2";

/** Decorative film-grain/vignette overlay + date stamp. Injected once, fixed-position. */
export function FilmChrome() {
  return (
    <>
      <div className="film-vignette" />
      <div className="film-grain" />
      <div className="stamp" aria-hidden="true">
        {STAMP}
      </div>
    </>
  );
}
