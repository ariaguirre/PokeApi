import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {postPokemon, getTypes} from "../../redux/actions";
import logo from "../../images/logo.png"
import style from "./Form.module.css"


const Form = () => {
    const allTypes = useSelector((state) => state.types);
    useEffect(() => {dispatch(getTypes())}, [])




const [form, setForm] = useState({
    name:"",
    hp: "",
    weight: "",
    height: "",
    attack: "",
    speed: "", 
    defense: "",
    image:"",
    types: [],
})


const dispatch = useDispatch();

const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    
    setForm({...form, [property]:value})
}

const selectHandler = (event) => {
    setForm((form) => {
        if(!form.types.includes(event.target.value)){
            return {
                ...form, 
                types: [...form.types, event.target.value]
            }
        } else {
            return {...form}
        }
    })
}

const deleteSelectHandler = (event, type) => {
    event.preventDefault();
    setForm({
        ...form, 
        types: form.types.filter(t => t !== type)
    })
}


// console.log("renderiza form", form)

console.log("form.types", form.types)

const submitHandler = (event) => {
    event.preventDefault();
    if(form.name && form.hp && form.attack && form.defense ) {
        dispatch(postPokemon(form));
        alert("Pokemon created!")
    } else {
        alert("Missing data.")
    }
}
// console.log("alltypes:",allTypes)
    return (
        <div>
            <div className={style.goHomeBtn}>
        <Link to="/home" className={style.word}>Go to all Pokemons</Link>
            </div>
        <Link to="/">
        <img src={logo} className={style.logo} alt="imagen logo"/>
        </Link>
        <div className={style.formDiv}>
        <h1>Create a new Pokemon</h1>
            <form onSubmit={submitHandler}>
                <br/>
                <div>
                <label>Name: </label>
                <input type="text" value={form.name} onChange={changeHandler} name = "name" />
                </div>
                <br/>
                <div>
                <label>Hp: </label>
                <input type="number" value={form.hp} onChange={changeHandler} name = "hp" />
                </div>
                <br/>
                <div>
                <label>Attack: </label>
                <input type="number" value={form.attack} onChange={changeHandler} name = "attack" />
                </div>
                <br/>
                <div>
                <label>Speed: </label>
                <input type="number" value={form.speed} onChange={changeHandler} name = "speed" />
                </div>
                <br/>
                <div>
                <label>Defense: </label>
                <input type="number" value={form.defense} onChange={changeHandler} name = "defense" />
                </div>
                <br/>
                <div>
                <label> Weight: </label>
                <input type="number" value={form.weight} onChange={changeHandler} name = "weight" />
                </div>
                <br/>
                <div>
                <label> Height: </label>
                <input type="number" value={form.height} onChange={changeHandler} name = "height" />
                </div>
                <br/>
                <div className={style.imgInput}>
                <label>Image: </label>
                {/* <input type="file" accept="image/png, image/jpeg" aria-label="Upload" value={form.image}  onChange={changeHandler} name = "image"/> */}
                <input type="text" value={form.image || "https://e7.pngegg.com/pngimages/569/963/png-clipart-pokeball-illustration-ash-ketchum-pokeball-s-image-file-formats-rim.png"} onChange={changeHandler} name = "image" />
                </div>
                <br/>
                <div>
                {allTypes ? 
                <div>
                    <label>Types: </label>
                    <select className={style.typeSelector} onChange={event => selectHandler(event)} >
                        {allTypes.map((type) => {
                            return <option value={type.name}> {type.name}</option>
                        })}
                    </select>
                        <br/>
                </div> :
                <p>Loading types...</p>
                    }
                </div>
                <div>
                    {form.types.length > 0 ? 
                    form.types.map((type) => {
                        return(
                            <div>
                                <label> {type}</label>
                                    <button onClick={(event) => deleteSelectHandler(event, type)}>x</button>
                            </div>
                        )
                    }) 
                    : <h4>No types selected</h4> 
                }
                </div>
                <button type="submit" className={style.btn}>Create</button>
                <br/>
                
            </form>
                <br/>
                <br/>
        </div>
        </div>
        )
}

export default Form;