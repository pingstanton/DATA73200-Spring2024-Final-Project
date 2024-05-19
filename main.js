/* DATA 73200 - INTERACTIVE DATA VISUALIZATION
Instructor: Eleanor Frymire

CUNY GRADUATE CENTER | 365 5th Ave, New York, NY 10016

** MUTATIONS OF MODERNITY IN TWELVE MOVEMENTS **
final project * May 2024

MATTHEW STANTON | mstanton@gradcenter.cuny.edu | pingstanton@gmail.com
https://github.com/pingstanton/ 

*/

/* CONSTANTS AND GLOBALS */

const width = window.innerWidth * 0.9;
const height = 172; /* fixed height */
const MoMAsansserif = "Arial Black, sans-serif"; 
const sansserif = "Arial, sans-serif"; 
const serif = "Times New Roman, serif"; 

const artWidth = width * 0.44;

/* horizontal year labels... */
const yearstart = 1870; /* roughly from Impressionism... */
const yearend = 1985; /* ...arbitary end of scale */
const scaleOffset = window.innerWidth * 0.01; /* slight adjustment in aligning bars under dates */
const years = d3.range(1870, 1986, 10); /* constant range of start at 1870, end 1980, with 10 years between steps */

/* setting up genre bars in gantt-chart like stack... */
const genres = [
  { name: "placeholder", label: "", start: 1870, end: 1870, color: "#ffffff", stackrow: "1",  title: "placeholder", span: "1890s-2010s", keywords: "Placeholder text.", summary: "Placeholder text.", summarylink: "https://www.moma.org/collection/terms/"},
  { name: "impressionism", label: "Impressionism", start: 1870, end: 1885, color: "#4b77f6", stackrow: "1", title: "Impressionism", span: "1870s onwards", keywords: "Celebrating everyday light and movement.", summary: "A label applied to a loose group of mostly French artists who positioned themselves outside of the official Salon exhibitions organized by the Académie des Beaux-Arts. Rejecting established styles, the Impressionists began experimenting in the early 1860s with a brighter palette of pure unblended colors, synthetic paints, sketchy brushwork, and subject matter drawn from their direct observations of nature and of everyday life in and around Paris. They worked out of doors, the better to capture the transient effects of sunlight on the scenes before them. With their increased attention to the shifting patterns of light and color, their brushwork became rapid, broken into separate dabs that better conveyed the fleeting quality of light.", summarylink: "https://www.moma.org/collection/terms/impressionism"},
  { name: "postimpressionism", label: "Post-Impressionism", start: 1886, end: 1909, color: "#109ac6", stackrow: "1", title: "Post-Impressionism", span: "Mid-1880s onwards", keywords: "Delve into emotional expression.", summary: "A term coined in 1910 by the English art critic and painter Roger Fry and applied to the reaction against the naturalistic depiction of light and color in Impressionism. Though Paul Cézanne, Paul Gauguin, Vincent van Gogh, and Georges Seurat each developed their own distinctive styles, they were unified by an interest in expressing their emotional and psychological responses to the world through bold colors and expressive, often symbolic images. Post-Impressionism can be roughly dated from 1886 to 1905.", summarylink: "https://www.moma.org/collection/terms/post-impressionism"},
  { name: "artnoveau", label: "Art Nouveau", start: 1890, end: 1910, color: "#719a34", stackrow: "2", title: "Art Noveau", span: "1890s-1910s", keywords: "Nature-inspired designs with functionality.", summary: "An international artistic movement of the late 19th and early 20th centuries that emphasized the unity of the arts and sought to reflect the intensive psychic and sensory stimuli of the modern city. Although it influenced painting and sculpture, the movement's chief manifestations were in design, performance art, and architecture. Variants of the movement in cities throughout Europe and the US accrued labels such as Arte Nova, Glasgow Style, Stile Liberty, and Arte Modernista. The version commonly referred to as Art Nouveau (\"New Art\" in French) flourished in France and Belgium and was characterized by curving, uneven lines based on organic forms.", summarylink: "https://www.moma.org/collection/terms/art-nouveau-new-art"},
  { name: "fauvism", label: "Fauvism", start: 1904, end: 1914, color: "#c50282", stackrow: "3", title: "Fauvism", span: "1904-1914", keywords: "Bold colors. Simplified forms. Raw emotion.", summary: "A style of painting in the first decade of the 20th century that emphasized strong, vibrant color and bold brushstrokes over realistic or representational qualities. Central among the loose group of artists were Henri Matisse and Andre Derain. When their paintings were exhibited in 1905, a critic derisively described the works-with their expressive and non-naturalistic palette-as the product of Fauves (wild beasts).", summarylink: "https://www.moma.org/collection/terms/fauvism"},
  { name: "expressionism", label: "Expressionism", start: 1905, end: 1929, color: "#ff792c", stackrow: "4", title: "Expressionism", span: "1905-1920s", keywords: "Exaggerated colors. Emotional intensity.", summary: "Encompasses varying stylistic approaches that emphasize intense personal expression. Renouncing the stiff bourgeois social values that prevailed at the turn of the 20th century, and rejecting the traditions of the state-sponsored art academies, Expressionist artists turned to boldly simplified or distorted forms and exaggerated, sometimes clashing colors. As Expressionism evolved from the beginning of the 20th century through the early 1920s, its crucial themes and genres reflected deeply humanistic concerns and an ambivalent attitude toward modernity, eventually confronting the devastating experience of World War I and its aftermath.", summarylink: "https://www.moma.org/collection/terms/expressionism"},
  { name: "cubism", label: "Cubism", start: 1907, end: 1915, color: "#82466d", stackrow: "5", title: "Cubism", span: "Early 20th cenutry", keywords: "Shattered reality. Geometric fragments.", summary: "Originally a term of derision used by a critic in 1908, Cubism describes the work of Pablo Picasso, Georges Braque, and those influenced by them. Working side by side, they developed a visual language whose geometric planes and compressed space challenged what had been the defining conventions of representation in Western painting: the relationship between solid and void, figure and ground. Traditional subjects-nudes, landscapes, and still lifes-were reinvented as increasingly fragmented compositions. Cubism's influence extended to an international network of artists working in Paris in those years and beyond.", summarylink: "https://www.moma.org/collection/terms/cubism"},
  { name: "dadism", label: "Dadaism", start: 1916, end: 1930, color: "#466b82", stackrow: "3", title: "Dadism", span: "1910s-1920s", keywords: "Reject tradition. Adopt absurdity and randomness.", summary: "An artistic and literary movement formed in response to the disasters of World War I (1914–18) and to an emerging modern media and machine culture. Dada artists sought to expose accepted and often repressive conventions of order and logic, favoring strategies of chance, spontaneity, and irreverence. Dada artists experimented with a range of mediums, from collage and photomontage to everyday objects and performance, exploding typical concepts of how art should be made and viewed and what materials could be used. An international movement born in neutral Zurich and New York, Dada rapidly spread to Berlin, Cologne, Hannover, Paris, and beyond.", summarylink: "https://www.moma.org/collection/terms/dada"},
  { name: "surrealism", label: "Surrealism", start: 1917, end: 1959, color: "#e21e27", stackrow: "1", title: "Surrealism", span: "1920s-60s", keywords: "Explore the unconscious and dream imagery.", summary: "An artistic and literary movement led by French poet André Breton from 1924 through World War II. Drawing on the psychoanalytic theories of Sigmund Freud, the Surrealists sought to overthrow what they perceived as the oppressive rationalism of modern society by accessing the sur réalisme (superior reality) of the subconscious. In his 1924 \"Surrealist Manifesto,\" Breton argued for an uninhibited mode of expression derived from the mind's involuntary mechanisms, particularly dreams, and called on artists to explore the uncharted depths of the imagination with radical new methods and visual forms. These ranged from abstract \"automatic\" drawings to hyper-realistic painted scenes inspired by dreams and nightmares to uncanny combinations of materials and objects.", summarylink: "https://www.moma.org/collection/terms/surrealism"},
  { name: "abstract", label: "Abstract", start: 1943, end: 1957, color: "#1851f2", stackrow: "2", title: "Abstract Expressionism", span: "1940s-50s", keywords: "Spontaneity. Big scale. Experimental. Emotional.", summary: "The dominant artistic movement in the 1940s and 1950s, Abstract Expressionism was the first to place New York City at the forefront of international modern art. The associated artists developed greatly varying stylistic approaches, but shared a commitment to an abstract art that powerfully expresses personal convictions and profound human values. They championed bold, gestural abstraction in all mediums, particularly large painted canvases.", summarylink: "https://www.moma.org/collection/terms/abstract-expressionism"},
  { name: "popart", label: "Pop Art", start: 1955, end: 1985, color: "#b866a0", stackrow: "3", title: "Pop Art", span: "Mid-1950s onwards", keywords: "Mass culture itself as art. World-famous for 15 minutes.", summary: "A movement comprising initially British, then American artists in the 1950s and 1960s. Pop artists borrowed imagery from popular culture-from sources including television, comic books, and print advertising-often to challenge conventional values propagated by the mass media, from notions of femininity and domesticity to consumerism and patriotism. Their often subversive and irreverent strategies of appropriation extended to their materials and methods of production, which were drawn from the commercial world.", summarylink: "https://www.moma.org/collection/terms/pop-art"},
  { name: "minimalism", label: "Minimalism", start: 1959, end: 1985, color: "#17bb46", stackrow: "2", title: "Minimalism", span: "1960s onwards", keywords: "Simplified forms. Clean lines. Purity and clarity.", summary: "A primarily American artistic movement of the 1960s, characterized by simple geometric forms devoid of representational content. Relying on industrial technologies and rational processes, Minimalist artists challenged traditional notions of craftsmanship, using commercial materials such as fiberglass and aluminum, and often employing mathematical systems to determine the composition of their works.", summarylink: "https://www.moma.org/collection/terms/minimalism"},
  { name: "conceptual", label: "Conceptual", start: 1965, end: 1985, color: "#c56702", stackrow: "1", title: "Conceptual Art", span: "Mid-1960s onwards", keywords: "Idea over aesthetics. Challenge definitions.", summary: "In the 1960s, many artists experimented with art that emphasized ideas over objects and materials traditionally associated with art making. In 1967, Sol LeWitt wrote in his essay \"Paragraphs on Conceptual Art\" that \"the idea itself, even if it is not made visual, is as much of a work of art as any finished product.\" Conceptual artists used their work to question the notion of what art is, and to critique the underlying ideological structures of artistic production, distribution, and display.", summarylink: "https://www.moma.org/collection/terms/conceptual-art"}
];
const genresheight = 20;

/* SCALES */

/* global scope */
let xScale, yScale, svg;

/* year text labels */
let textX = d3.scaleLinear()
	.domain([yearstart, yearend])
	.range([0, width]); /* tightening in to avoid cutting off numbers */
let textY = 15; /* distance from top of SVG */

/* genre rect/bar */
const genresX = d3.scaleLinear()
	.domain([yearstart, yearend])
	.range([0, width + 5]); 

/* APPLICATION STATE */
let state = {
	data: [],
};
	const filename = "curratedlist11.csv"; /* legacy bit, used to label raw data table on HMTL page */

/* LOAD DATA */
/* This is a VERY curated list from the MoMA collection... */
d3.csv('curratedlist12.csv', d3.autoType).then(raw_data => {
	console.log("data", raw_data);
	state.data = raw_data;
	init();
});

/* INITIALIZING FUNCTION */

function init() {

/* HTML & VISUAL ELEMENTS */

	svg = d3.select("#genrenav")
		.append("svg")
		.attr("width", width) /* variable set above as const */
		.attr("height", height) /* variable set above as const */

/* artist's lifespan */
	svg.selectAll(".lifespan")
		.data(genres)
		.join("rect")
		.attr("class", "lifespan")
		.attr("y", 20)
		.attr("x", width + 100)
		.attr("width", 10)
		.attr("height", height - 40)
		.attr("fill", "#f0f0f0")
		.attr("opacity", 1);

	svg.append("text")
		.attr("class", "lifespanLabel")
		.attr("x", width + 100 )
		.attr("y", height - 8 )
		.attr("text-anchor", "start")
		.text("ARTIST'S LIFESPAN")
		.style("font-family", sansserif)
		.style("font-size", "11px")
		.attr("font-weight", "600")
		.style("fill", "#888888")
		.attr("opacity", 0.3);


/* year marker line */

	svg.append("text")
		.attr("class", "artworkDate")
		.attr("x", width + 100 )
		.attr("y", height - 8 )
		.attr("text-anchor", "start")
		.text("ARTWORK DATE")
		.style("font-family", sansserif)
		.style("font-size", "11px")
		.attr("font-weight", "600")
		.style("fill", "#888888");

	svg.append("line")
		.attr("x1", width + 100)
	    .attr("x2", width + 100)
	    .attr("y1", 20)
	    .attr("y2", height - 6)
		.attr("class", "artworkMark")
	    .attr("stroke", "#666666")
	    .attr("stroke-width", 2)
		.attr("opacity", 0.3);

/* horizontal line under genre buttons */
	svg.append("line")
	    .attr("x1", 0)
	    .attr("x2", width)
	    .attr("y1", height - 3)
	    .attr("y2", height - 3)
		.attr("class", "rule")
	    .attr("stroke", "#cccccc")
	    .attr("stroke-width", 3);

/* genre bars */

	svg.selectAll(".yearLabel")
		.data(years)
		.enter()
		.append("text")
		.attr("class", "yearLabel")
		.attr("x", function(d) { return textX(d); })
		.attr("y", textY)
		.attr("text-anchor", "start")
		.text(function(d) { return d; })
		.style("font-family", sansserif)
		.style("font-size", "12px")
		.attr("font-weight", "900")
		.style("letter-spacing", "2px");

	svg.selectAll(".genrebar")
		.data(genres)
		.join("rect")
		.attr("class", "genrebar")
		.attr("y", function(d) { return d.stackrow * 25; })
		.attr("x", function(d) { return genresX(d.start); })
		.call(sel => sel
			.attr("width", 1)
			.attr("opacity", 0)
			.transition()
			.duration(800)
			.attr("width", function(d) { return genresX(d.end) - genresX(d.start) + 5; })
			.attr("opacity", 1)
		)
		.attr("height", genresheight)
		.attr("fill", function(d) { return d.color; });

	svg.selectAll(".genreLabel")
		.data(genres)
		.join("text")
		.attr("class", "genreLabel")
		.attr("x", function(d) { return (genresX(d.start)) + 5; })
		.attr("y", function(d) { return (d.stackrow * 25) + 15; })
		.call(sel => sel
			.attr("opacity", 0)
			.transition()
			.duration(1600)
			.attr("opacity", 1)
		)
		.attr("text-anchor", "start")
		.text(function(d) { return d.label; })
		.style("font-family", sansserif)
		.style("font-size", "11px")
		.attr("font-weight", "900")
		.style("fill", "#ffffff");

	let artDisplay, galleryCard;

	function displayArtwork(index, genreName) {

		const randomNumber = Math.floor(d3.randomUniform(0, 12)());
		const displayNumber = (index + randomNumber) % state.data.length;
		const MoMAdata = state.data[displayNumber];
		const artDisplay = d3.select("#artdisplay");
		const artworkTitle = d3.select("#artworkTitle");
		const artistName = d3.select("#artistName");
		const artistBio = d3.select("#artistBio");
		const artworkMore = d3.select("#artworkMore");

		artDisplay
			.style("opacity", 0)
			.html(() => {
				if (MoMAdata.artworkShape === "horz") {
					return `<a href="${MoMAdata.artworkURL}" target="_blank"><img src="${MoMAdata.artworkIMG}" width="${artWidth}" alt="${MoMAdata.artworkTitle} by ${MoMAdata.artistName}" border="0" /></a>`;
				} else if (MoMAdata.artworkShape === "vert") {
					return `<a href="${MoMAdata.artworkURL}" target="_blank"><img src="${MoMAdata.artworkIMG}" height="400" alt="${MoMAdata.artworkTitle} by ${MoMAdata.artistName}" border="0" /></a>`;
				}
			})
			.transition()
			.duration(1000)
			.style("opacity", 1);
		artworkTitle
			.style("opacity", 0)
			.html(`<em>${MoMAdata.artworkTitle}</em>`)
			.transition()
			.duration(1000)
			.style("opacity", 1);
		artistName
			.style("opacity", 0)
			.html(`${MoMAdata.artistName}`)
			.transition()
			.duration(1000)
			.style("opacity", 1);
		artistBio
			.style("opacity", 0)
			.html(`${MoMAdata.artistBio}`)
			.transition()
			.duration(1000)
			.style("opacity", 1);
		artworkMore
			.style("opacity", 0)
			.html(`<a href="${MoMAdata.artworkURL}" target="_blank">About&nbsp;this&nbsp;piece&nbsp;&raquo;</a><br /><a href="${MoMAdata.artistURL}" target="_blank">About&nbsp;this&nbsp;artist&nbsp;&raquo;</a></div>`)
			.transition()
			.duration(1000)
			.style("opacity", 1);
		d3.select(".artworkMark")
			.data(genres)
			.join()
			.transition()
			.duration(750)
			.attr("x1", genresX(MoMAdata.pointYear))
			.attr("x2", genresX(MoMAdata.pointYear));
		d3.select(".artworkDate")
			.transition()
			.duration(750)
			.attr("x", MoMAdata.pointYear < 1972 ? genresX(MoMAdata.pointYear) + 3 : genresX(MoMAdata.pointYear) - 3)
			.attr("text-anchor", MoMAdata.pointYear < 1972 ? "start" : "end")
			.attr("opacity", 0.5);
		d3.select(".lifespan")
			.transition()
			.duration(750)
			.attr("x", genresX(MoMAdata.birth) + scaleOffset)
			.attr("width", genresX(MoMAdata.death) - genresX(MoMAdata.birth) + scaleOffset);
		d3.select(".lifespanLabel")
			.transition()
			.duration(750)
			.attr("x", MoMAdata.birth < 1870 ? 5 : genresX(MoMAdata.birth) + scaleOffset)
			.attr("opacity", MoMAdata.pointYear < 1883 ? 0 : 0.5 );

	}

/* overlay rectangle for "hit" area of genre bars */
	svg.selectAll(".genreButton")
		.data(genres)
		.enter().append("rect")
		.attr("class", "genreButton")
		.attr("y", function(d) { return d.stackrow * 25; })
		.attr("x", function(d) { return genresX(d.start); })
		.attr("width", function(d) { return genresX(d.end) - genresX(d.start) + 5; })
		.attr("opacity", 0)
		.attr("height", genresheight)
		.attr("fill", "#fff")
		.on("click", function(event, d) {
	  		d3.select("#introblock")
				.style("display","none")
			d3.select("#aboutModernArt")
				.style("margin-top", "200px");
	  		d3.select(".rule")
				.transition()
				.duration(750)
				.attr("stroke", d.color)
				.attr("opacity", 0.3)
			d3.select("#genreTitle")
				.style("opacity", 0)
				.html(d.title)
				.transition()
				.duration(750)
				.style("opacity", 1)
			d3.select("#genreYear")
				.style("opacity", 0)
				.html(d.span)
				.transition()
				.duration(750)
				.style("opacity", 1)
			d3.select("#genreKeywords")
				.style("opacity", 0)
				.html(d.keywords)
				.transition()
				.duration(750)
				.style("opacity", 1)
			d3.select("#genresummary")
				.style("opacity", 0)
				.html(`<strong><a href="${d.summarylink}" target="_blank">From MoMA.org:</a></strong> ${d.summary}`)
				.transition()
				.duration(750)
				.style("opacity", 1)
/* default starting art pieces by genre fed into function above... */
			if (d.name === "impressionism") {
    			displayArtwork(0, "impressionism");
			} else if (d.name === "postimpressionism") {
    			displayArtwork(12, "postimpressionism");
			} else if (d.name === "artnoveau") {
    			displayArtwork(24, "artnoveau");
			} else if (d.name === "fauvism") {
    			displayArtwork(36, "fauvism");
			} else if (d.name === "expressionism") {
    			displayArtwork(48, "expressionism");
			} else if (d.name === "cubism") {
    			displayArtwork(60, "cubism");
			} else if (d.name === "dadism") {
    			displayArtwork(72, "dadism");
			} else if (d.name === "surrealism") {
    			displayArtwork(84, "surrealism");
			} else if (d.name === "abstract") {
    			displayArtwork(96, "abstract");
			} else if (d.name === "popart") {
    			displayArtwork(108, "popart");
			} else if (d.name === "minimalism") {
    			displayArtwork(120, "minimalism");
			} else if (d.name === "conceptual") {
    			displayArtwork(132, "conceptual");
			}
		});


/* BUTTON FUNCTIONALITY */

/* button highlight effect on mouseover */
svg.selectAll(".genreButton, .aboutPieceButton, .aboutArtistButton").on("mouseover", function() {
    d3.select(this)
		.call(sel => sel
			.attr("opacity", 0)
			.transition()
			.duration(200)
			.attr("opacity", 0.5)
		);
});
svg.selectAll(".genreButton, .aboutPieceButton, .aboutArtistButton, .genreLabel").on("mouseout", function() {
    d3.select(this)
		.call(sel => sel
			.attr("opacity", 0.5)
			.transition()
			.duration(1500)
			.attr("opacity", 0)

		);
});

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
	
}


}

