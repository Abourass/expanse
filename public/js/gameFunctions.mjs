// Time Saving Functions
export function nodeVisToggle(toggleNode, className) {
  if (Array.isArray(toggleNode)) {
    for (let step = 0; step < toggleNode.length; step++) {
      document.getElementById(`${toggleNode[step]}`).classList.toggle(`${className}`);
    }
  } else {
    document.getElementById(`${toggleNode}`).classList.toggle(`${className}`);
  }
}

export function nodeContent(selectedNode, content) {
    document.getElementById(`${selectedNode}`).innerHTML = `${content}`;
  }

