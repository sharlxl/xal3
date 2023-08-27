import { useState } from "react";


export default function MyListIndexPage() {
  const [newAnime, setNewAnime] = useState("")
  const [animeList, setAnimeList] = useState([""])

  const onChangeNewAnimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnime(e.target.value)
  }

  const onSubmitNewAnime = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnimeList(animeList => [ newAnime , ...animeList]);
  }

  const onClickAnime = (anime:"") => {
    console.log(anime)
    // const updatedList = animeList.filter(( animeInList ) => animeInList !== anime)
    setAnimeList(animeList.filter(( animeInList ) => animeInList !== anime))
  }
  return (
    <div>
      <p>New anime</p>
      <form className="flex py-1 gap-2" onSubmit={onSubmitNewAnime}>
        <input type="text" className="border px-4 text-base font-medium shadow-sm" value={newAnime} onChange={onChangeNewAnimeInput}/>
        <button className="border rounded-md px-4 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8" type="submit">Search!</button>
      </form>
      {animeList.length === 0 ? (
            <p className="p-4">No animes yet</p>
          ) : (
            <ol>
              {animeList.map((anime:any) => (
                <li id={anime} onClick={() => onClickAnime(anime)}>
                    📝 {anime}
                </li>
              ))}
            </ol>
          )}
    </div>
  );
}
