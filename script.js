window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	canvas.width = window.innerWidth * 0.8;
	canvas.height = window.innerHeight * 0.8;
	//canvas center
	const cx = canvas.width / 2;
	const cy = canvas.height / 2;

	//canvas settings
	context.strokeStyle = "green";
	context.lineWidth = 10;
	context.lineCap = "round";

	//effect settings
	const size = 200;
	const sides = 5;
	const maxDepth = 50;

	// notes
	// -----
	// canvas translate, scale, rotate adds up
	//
	// to make it not affect other shapes,
	// we can use save and restore
	context.save();
	context.translate(cx, cy);
	context.rotate(0);
	// context.fillRect(0, 0, canvas.width, canvas.height);

	function drawBranch(depth) {
		if (depth > maxDepth) return;
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(size, 0);
		context.stroke();
		context.translate(100, 0);
		context.rotate(0.5);
		context.scale(0.9, 0.9);

		drawBranch(depth + 1);
	}
	drawBranch(0);

	// for (let i = 0; i < sides; i++) {
	// 	context.rotate((Math.PI * 2) / sides);
	// }

	context.restore();
});
