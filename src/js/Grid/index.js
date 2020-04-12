import React from "react"
import "./styles.scss"

const defaultItems = [
	{ backgroundImage: "https://picsum.photos/600", color: "#BFBDA7" },
	{ backgroundImage: "https://picsum.photos/600", color: "#FE4814" },
	{ backgroundImage: "https://picsum.photos/600", color: "#847E96" },
	{ backgroundImage: "https://picsum.photos/600", color: "#D0FF71" },
	{ backgroundImage: "https://picsum.photos/600", color: "#993333" },
	{ backgroundImage: "https://picsum.photos/600", color: "#3AAAFA" },
	{ backgroundImage: "https://picsum.photos/600", color: "#41907A" },
	{ backgroundImage: "https://picsum.photos/600", color: "#E3C4E5" },
	{ backgroundImage: "https://picsum.photos/600", color: "#fef577" },
	{ backgroundImage: "https://picsum.photos/600", color: "#00ff59" },
	{ backgroundImage: "https://picsum.photos/600", color: "#6575a8" },
	{ backgroundImage: "https://picsum.photos/600", color: "#EBEBEB" },
]

const GridItem = (props) => {
	return (
		<a className="GridItem" href="#">
			<div
				className="GridItem__background"
				style={{
					backgroundImage: `url(${props.backgroundImage})`,
				}}></div>
			<div className="GridItem__overlay" style={{ background: props.color }}>
				<span>Top text</span>
				<small>Bottom text</small>
			</div>
		</a>
	)
}

const Grid = ({ items = defaultItems }) => {
	return (
		<div className="Grid">
			{items.map((item, index) => (
				<GridItem key={index} {...item} index={index} />
			))}
		</div>
	)
}

export default Grid
