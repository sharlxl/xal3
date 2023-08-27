import { useState } from "react";

//TODO:
/**
 * 1. onclick li to delete or edit
 * 2. make columns for want to watch, watchlist, completed, dropped.
 * 3. make anime object model for typescript
 * 4. 
 */

export default function MyListIndexPage() {
  const [newAnime, setNewAnime] = useState("")
  const [animeList, setAnimeList] = useState([""])
  const [editing, setEditing] = useState(false)
  const [editAnime, setEditAnime] = useState("")

  const onChangeNewAnimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnime(e.target.value)
  }

  const onSubmitNewAnime = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnimeList(animeList => [ newAnime , ...animeList]);
  }

  const onClickEdit = (anime: string) => {
    setEditing(true)
    setEditAnime(anime)
  }

  const onClickSaveEdit = (anime: string) => {
    setEditing(false)
    const removedEditingAnime = animeList.filter(( animeInList ) => animeInList !== anime)
    setAnimeList([ editAnime, ...removedEditingAnime ])
  }

  const onClickDel = (anime:"") => {
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
                <li>{editing ? 
                  (<><input 
                      type="text" 
                      value={editAnime}
                      onChange={(e)=> {setEditAnime(e.target.value)}}
                      className="border"/>
                    <button className="border" onClick={() => {onClickSaveEdit(anime)}}>Save</button></>) : 
                  <p onClick={() => onClickEdit(anime)}>
                    📝 {anime}
                  </p>}
                  <button className="border" onClick={() => onClickDel(anime)}>
                    del
                  </button>
                </li>
              ))}
            </ol>
          )}
    </div>
  );
}
