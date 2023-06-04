import Head from 'next/head'
import ListIngredients from "@/components/ListIngredients";
import SearchBox from "@/components/SearchBox";
import {useState} from "react";

export default function Home() {
	const [highlightIng, setHighlightIng] = useState([])
	return (
		<main className={`min-h-screen`}>
			<Head>
				<title>Semantic Search</title>
			</Head>
			<div className={'lg:p-5 pt-0 mx-auto border'}>
				<div className={'text-purple-500 text-3xl px-3 mb-4'}>
					<h1>Semantic Search</h1>
				</div>
				<div className={'w-full grid grid-cols-1 lg:grid-cols-3'}>
					<div className={'p-3'}>
						<SearchBox setHighlightIng={setHighlightIng}/>
					</div>
					<div className={'lg:border-l col-span-2 p-3'}>
						<ListIngredients ingsArr={highlightIng}/>
					</div>
				</div>
			</div>
		</main>
	)
}
