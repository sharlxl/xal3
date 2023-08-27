import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
//TODO:
/**
 * 1. onclick li to delete or edit
 *    figure out how to silo edit.
 *    - add id to each li during mapping
 *    - edit by finding id
 * 2. make columns for want to watch, watchlist, completed, dropped.
 * 3. make anime object model for typescript
 * 4. 
 */

export default function MyListIndexPage() {
  const [newAnime, setNewAnime] = useState("")
  const [animeList, setAnimeList] = useState([{id: "", name:""}])
  const [editing, setEditing] = useState("")
  const [editAnime, setEditAnime] = useState("")

  const onChangeNewAnimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnime(e.target.value)
  }

  const onSubmitNewAnime = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnimeList(animeList => [ {name: newAnime, id: uuidv4()} , ...animeList]);
  }

  const onClickEdit = (anime: any) => {
    console.log(anime)
    setEditing(anime.id)
    setEditAnime(anime.name)
  }

  const onClickSaveEdit = (anime: {}) => {
    console.log(anime)
    setEditing("")
    // setEditing(false)
    // const removedEditingAnime = animeList.filter(( animeInList ) => animeInList !== anime.name)
    // setAnimeList([ editAnime, ...removedEditingAnime ])
  }

  const onClickDel = (id: string) => {
    console.log(id)
    // const updatedList = animeList.filter(( animeInList ) => animeInList !== anime)
    setAnimeList(animeList.filter(( animeInList ) => animeInList.id !== id))
  }

  return (
    <div>
      <p>New anime</p>
      <form className="flex py-1 gap-2" onSubmit={onSubmitNewAnime}>
        <input type="text" className="border px-4 text-base font-medium shadow-sm" value={newAnime} onChange={onChangeNewAnimeInput}/>
        <button className="border rounded-md px-4 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8" type="submit">Add</button>
      </form>
      {animeList.length === 0 ? (
            <p className="p-4">No animes yet</p>
          ) : (
            <ol>
              {animeList.map((anime) => (
                <li key={anime.id}>{editing === anime.id ? 
                  (<><input 
                      type="text" 
                      value={editAnime}
                      onChange={(e)=> {setEditAnime(e.target.value)}}
                      className="border"/>
                    <button className="border" onClick={() => {onClickSaveEdit(anime)}}>Save</button></>) : 
                  <p onClick={() => onClickEdit(anime)}>
                    📝 {anime.name}
                  </p>}
                  <button className="border" onClick={() => onClickDel(anime.id)}>
                    del
                  </button>
                </li>
              ))}
            </ol>
          )}
    </div>
  );
}
