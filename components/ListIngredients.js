import {ingredients} from '@/constants'

export default function ListIngredients({ingsArr}) {
	return (
		<div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10"}>
			{
				Object.entries(ingredients).map(([key, value]) => (
					<div key={key}>
						<h3 className={"font-semibold uppercase border-b"}>{key}</h3>
						<ol className={'mt-2'}>
							{value.map(item => <li className={`mt-1 ${ingsArr.includes(item) > 0 ? 'bg-yellow-300' : undefined}`} key={item}>{item}</li>)}
						</ol>
					</div>
					)
				)
			}
		</div>
	)
}