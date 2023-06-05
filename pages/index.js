import Head from 'next/head'
import ListIngredients from "@/components/ListIngredients";
import SearchBox from "@/components/SearchBox";
import {useState} from "react";
import Link from "next/link";

export default function Home() {
	const [highlightIng, setHighlightIng] = useState([])
	return (
		<main className={`min-h-screen flex flex-col`}>
			<Head>
				<title>Semantic Search</title>
			</Head>
			<div className={'pt-0 w-full lg:max-w-7xl mx-auto flex-grow'}>
				<div className={'text-purple-500 text-3xl px-3 my-4'}>
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
			<div className={'flex-shrink-0 text-center text-md p-4 border-t'}>
				Created by <Link className={'text-purple-500'} href={"https://www.mejaz.in"} target={'_blank'} rel={'noopener noreferrer'}>Mohd Ejaz Siddiqui</Link>
			</div>
		</main>
	)
}
