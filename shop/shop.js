import "../main/jquery-3.6.0.min.js"
import "../main/circletype.min.js";
import config from "../main/config.js"

// Wait for page to load
$(() =>
{
	const cartPotions = [];

	// Resize elements when the page has changed size
	const resize = () =>
	{
		// Shelf width snapped to potion width
		let width = Math.floor($(window).width() / config.potionWidth) * config.potionWidth;

		// Resize shelf
		$(".shelf").css({
			backgroundSize: `${config.shelfImageWidth}px auto`,
			width: `${width}px`
		});

		// Resize potions
		$(".potion").css({
			width: `${config.potionWidth}px`,
			height: `${config.potionHeight}px`
		});
	};
	resize();
	$(window).on("resize", () => resize());

	// Build potion HTML from a potion object
	const buildPotion = (potion, isInteractive, $container) =>
	{
		// Build the HTML
		const $potion = $(`
			<div class="potion ${isInteractive ? "interactive" : ""}" style="width: ${config.potionWidth}px; height: ${config.potionHeight}px;">
				<img class="photo" src="${potion.imageSrc}" alt="${potion.title}" />
				<div class="title">
				${potion.title}
				</div>
				<div class="tag">
				$${potion.price}
				</div>
				<div class="addToCart">
					Add to cart
				</div>
			</div>
		`);

		if(isInteractive)
		{
			$potion.on("click", () =>
			{
				const $cartPotion = buildPotion(potion, false, $(".cart"));
				$cartPotion.css({
					position: "absolute",
					left: `${$potion.offset().left}px`,
					top: `${$potion.offset().top}px`
				});
				$cartPotion.animate({
					left: `${cartPotions.length * 80}px`,
					top: "200px"
				})
				cartPotions.push($cartPotion);
			});
		}

		// Append the potion HTML to the container element
		$container.append($potion);

		// Curve the potion title
		new CircleType($potion.find(".title")[0])
			.radius(300);

		return $potion;
	};

	// Get potions array from API
	$.getJSON("../api/potions.json", (potions) =>
	{
		const $shelf = $(".shelf");

		// Loop through the data for potions
		for(const potion of potions)
		{
			buildPotion(potion, true, $shelf);
		}
	});
});
