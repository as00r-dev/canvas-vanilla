window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");

	//canvas settings
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context.strokeStyle = "green";
	context.lineWidth = 10;
	context.lineCap = "round";

	//canvas center
	const cx = canvas.width / 2;
	const cy = canvas.height / 2;

	//effect settings
	const effect = {
		size: 200,
		sides: 5,
		maxDepth: 3,
		spread: 0.8,
		branches: 2,
		scale: 0.5,
	};

	function drawBranch(depth) {
		if (depth > effect.maxDepth) return;

		for (let i = 0; i < effect.branches; i++) {
			context.save();
			drawLine(0, 0);
			doTransformations(
				effect.size - (effect.size / effect.branches) * i,
				0,
				effect.spread,
				effect.scale,
				effect.scale
			);
			drawBranch(depth + 1);
			context.restore();
			context.save();
			drawLine(0, 0);
			doTransformations(
				effect.size - (effect.size / effect.branches) * i,
				0,
				-effect.spread,
				effect.scale,
				effect.scale
			);
			drawBranch(depth + 1);
			context.restore();
		}
	}

	function drawFractal() {
		context.save();
		context.translate(cx, cy);
		context.rotate(0);
		for (let i = 0; i < effect.sides; i++) {
			context.rotate((Math.PI * 2) / effect.sides);
			drawBranch(0);
		}
		context.restore();
	}
	// drawFractal();

	function drawLine(x, y) {
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(effect.size, 0);
		context.stroke();
	}

	function doTransformations(tx, ty, angle, sx, sy) {
		context.translate(tx, ty);
		context.rotate(angle);
		context.scale(sx, sy);
	}
	drawFractal();
});
