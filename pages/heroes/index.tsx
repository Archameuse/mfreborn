import type { NextPage } from 'next'
import Image from 'next/image'
import Layout from '../../components/Layout'
import styles from '../../styles/Characters.module.css'
import {characters} from "../../public/characters.json"
import axios from 'axios'

const Heroes: NextPage = () => {
    function ArrSplitter(max:number, array:any[]){
        let newArr:any[] = []
        let limit:number = Math.ceil(array.length/max)
        for (let i = 0; i < limit; i++) {
            for (let i = 0; array.length < max; i++) {
                array.push('empty')
            }
            let tosplice:any[] = array.splice(0, max)
            newArr = newArr.concat(tosplice)
        }
        return newArr
    }
    // axios.get('/api/gdapi')
    //     .then(res => console.log(res.data))
    function handleClick():void {
        axios.get('/api/gdapi')
            .then(res => console.log(res))
        // axios.get('/api/gdapi')
        //     .then(res => console.log(res))
    }

return(
<Layout title='Heroes'>
    <button onClick={handleClick}>test</button>
<div className={styles.grid}>
    {ArrSplitter(4, [...Array(33)]).map((e, i) => (
        <div className={styles.cell} key={i}>
            {!e && (<Image src='/batr.webp' layout='fill' objectFit='cover'/>)}
        </div>
    ))}
</div>
</Layout>
)
}

export default Heroes