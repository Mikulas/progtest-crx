(function() {
	var $countdown = document.getElementById("countdown");
	$countdown.parentNode.removeChild($countdown);

	var boxes = document.querySelectorAll("div.topLayout");
	var results = [];
	var $task, $refResult;
	for (var i in boxes) {
		if (i == 0) {
		} else if (i == 1) {
			$task = boxes[i];

		} else if (i == 2) {
			$refResult = boxes[i];

		} else if (boxes[i].nodeType === 1) {
			results.push(boxes[i]);
		}
	}

	for (var i in results) {
		$task.parentNode.insertBefore(results[i], $task);
		var rows = results[i].querySelectorAll('tr');
		var $header, content = [];
		for (var k in rows) {
			if (k == 0) {
				$header = rows[k];
			} else if (rows[k].nodeType === 1) {
				content.push(rows[k]);
				rows[k].classList.add('hidden');
			}
		}
		$header.classList.toggle('result-header');

		var headerCols = $header.querySelectorAll('td');

		// fix column sizing
		var cols = results[i].querySelectorAll('colgroup col');
		cols[0].setAttribute('width', 100);
		cols[2].setAttribute('width', 300);

		// move download button
		var $infoNode = content[0].querySelector('.rtbCell');
		if (!$infoNode) {
			$infoNode = document.createElement('tr');
			$infoNode.classList.add('rtbCell');
			$infoNode.addAttribute('rowspan', 2);
		}
		$infoNode.appendChild(headerCols[2].querySelector('div'));

		// move date to right column
		headerCols[2].innerHTML = headerCols[1].innerHTML;
		headerCols[1].innerHTML = "";

		// copy score to header
		var score = content[1].querySelector('.bCell').innerText;
		var $scoreNode = document.createElement('div');
		$scoreNode.innerText = score;
		headerCols[1].appendChild($scoreNode);

		$header.addEventListener('click', function(e) {
			var node = e.target;
			while (!node.classList.contains('result-header')) {
				node = node.parentNode;
			}
			while (node = node.nextElementSibling) {
				node.classList.toggle('hidden');
			}
		});
	}
})();
