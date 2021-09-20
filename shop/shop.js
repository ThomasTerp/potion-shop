import "../main/jquery-3.6.0.min.js"
import "../main/circletype.min.js";
import config from "../main/config.js"
import Potion from "./potion.js"

// Wait for page to load
$(() =>
{
	// Resize elements when the page has changed size
	const resize = () =>
	{
		let width = Math.floor($(window).width() / config.potionWidth) * config.potionWidth;

		$(".shelf").css({
			backgroundSize: `${config.shelfImageWidth}px auto`,
			width: `${width}px`
		});

		$(".potion").css({
			width: `${config.potionWidth}px`,
			height: `${config.potionHeight}px`
		});
	};
	resize();
	$(window).resize(() => resize());

	// Get potions array from API
	$.getJSON("../api/potions.json", (potionsData) =>
	{
		// Loop through the data for potions
		for(const potionData of potionsData)
		{
			// Create a Potion object from the data
			const potion = new Potion(potionData.id, potionData.title, potionData.price, potionData.imageSrc);
			// Create HTML for the potion
			const $potion = $(`
				<div class="potion">
					<img class="photo" src="${potion.imageSrc}" alt="${potion.title}" />
					<div class="title">
						${potion.title}
					</div>
					<div class="tag">
						$${potion.price}
					</div>
				</div>
			`);
			$potion.data(potion);
			$potion.css({
				width: `${config.potionWidth}px`,
				height: `${config.potionHeight}px`
			});
			// Append the potion HTML to the .shelf element
			$(".shelf").append($potion);

			// Curve the potoin title
			new CircleType($potion.find(".title")[0])
				.radius(300);
		}
	});
});
