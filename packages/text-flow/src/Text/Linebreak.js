import * as List from "../LinkedList";

const defaults = () => ({
  demerits: {
    fitness: 3000,
    flagged: 100,
    line: 10
  },
  tolerance: 0
});

export const infinity = 10000;

const linebreak = (nodes, lines, settings = defaults()) => {
  const options = defaults();

  if (settings.tolerance) {
    options.tolerance = settings.tolerance;
  }

  const activeNodes = new List.LinkedList();
  const sum = {
    shrink: 0,
    stretch: 0,
    width: 0
  };
  const lineLengths = lines;
  const breaks = [];
  let tmp = {
    data: {
      demerits: Infinity
    }
  };

  const breakpoint = (
    position,
    demerits,
    ratio,
    line,
    fitnessClass,
    totals,
    previous
  ) => ({
    demerits,
    fitnessClass,
    line,
    position,
    previous,
    ratio,
    totals: totals || {
      shrink: 0,
      stretch: 0,
      width: 0
    }
  });

  const computeCost = (end, active, currentLine) => {
    let width = sum.width - active.totals.width;
    let stretch = 0;
    let shrink = 0;
    const lineLength =
      currentLine < lineLengths.length
        ? lineLengths[currentLine - 1]
        : lineLengths[lineLengths.length - 1];

    if (nodes[end].type === "penalty") {
      width += nodes[end].width;
    }

    if (width < lineLength) {
      stretch = sum.stretch - active.totals.stretch;

      if (stretch > 0) {
        return (lineLength - width) / stretch;
      }
      return infinity;
    }
    if (width > lineLength) {
      shrink = sum.shrink - active.totals.shrink;

      if (shrink > 0) {
        return (lineLength - width) / shrink;
      }
      return infinity;
    }
    return 0;
  };

  const computeSum = breakPointIndex => {
    const result = {
      shrink: sum.shrink,
      stretch: sum.stretch,
      width: sum.width
    };
    let i = 0;

    for (i = breakPointIndex; i < nodes.length; i += 1) {
      if (nodes[i].type === "glue") {
        result.width += nodes[i].width;
        result.stretch += nodes[i].stretch;
        result.shrink += nodes[i].shrink;
      } else if (
        nodes[i].type === "box" ||
        (nodes[i].type === "penalty" &&
          nodes[i].penalty === -infinity &&
          i > breakPointIndex)
      ) {
        break;
      }
    }
    return result;
  };

  const mainLoop = (node, index, ns) => {
    let active = List.first(activeNodes);
    let ratio = 0;
    let demerits = 0;
    let candidates = [];
    let badness;
    let currentLine = 0;
    let tmpSum;
    let currentClass = 0;
    let fitnessClass;
    let candidate;
    let newNode;

    while (active !== null) {
      candidates = [
        { active: null, demerits: Infinity, ratio: 0 },
        { demerits: Infinity },
        { demerits: Infinity },
        { demerits: Infinity }
      ];

      while (active !== null) {
        const { next } = active;
        currentLine = active.data.line + 1;
        ratio = computeCost(index, active.data, currentLine);

        if (
          ratio < -1 ||
          (node.type === "penalty" && node.penalty === -infinity)
        ) {
          List.remove(activeNodes, active);
        }

        if (ratio >= -1 && ratio <= options.tolerance) {
          badness = 100 * Math.pow(Math.abs(ratio), 3);

          if (node.type === "penalty" && node.penalty >= 0) {
            demerits =
              Math.pow(options.demerits.line + badness, 2) +
              Math.pow(node.penalty, 2);
          } else if (node.type === "penalty" && node.penalty !== -infinity) {
            demerits =
              Math.pow(options.demerits.line + badness, 2) -
              Math.pow(node.penalty, 2);
          } else {
            demerits = Math.pow(options.demerits.line + badness, 2);
          }

          if (
            node.type === "penalty" &&
            ns[active.data.position].type === "penalty"
          ) {
            demerits +=
              options.demerits.flagged *
              node.flagged *
              ns[active.data.position].flagged;
          }

          if (ratio < -0.5) {
            currentClass = 0;
          } else if (ratio <= 0.5) {
            currentClass = 1;
          } else if (ratio <= 1) {
            currentClass = 2;
          } else {
            currentClass = 3;
          }

          if (Math.abs(currentClass - active.data.fitnessClass) > 1) {
            demerits += options.demerits.fitness;
          }

          demerits += active.data.demerits;

          if (demerits < candidates[currentClass].demerits) {
            candidates[currentClass] = {
              active,
              demerits,
              ratio
            };
          }
        }

        active = next;

        if (active !== null && active.data.line >= currentLine) {
          break;
        }
      }

      tmpSum = computeSum(index);

      for (
        fitnessClass = 0;
        fitnessClass < candidates.length;
        fitnessClass += 1
      ) {
        candidate = candidates[fitnessClass];

        if (candidate.demerits < Infinity) {
          newNode = new List.Node(
            breakpoint(
              index,
              candidate.demerits,
              candidate.ratio,
              candidate.active.data.line + 1,
              fitnessClass,
              tmpSum,
              candidate.active
            )
          );

          if (active !== null) {
            List.insertBefore(activeNodes, active, newNode);
          } else {
            List.push(activeNodes, newNode);
          }
        }
      }
    }
  };

  List.push(
    activeNodes,
    new List.Node(breakpoint(0, 0, 0, 0, 0, undefined, null))
  );

  nodes.forEach((node, index, ns) => {
    if (node.type === "box") {
      sum.width += node.width;
    } else if (node.type === "glue") {
      if (index > 0 && nodes[index - 1].type === "box") {
        mainLoop(node, index, ns);
      }
      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;
    } else if (node.type === "penalty" && node.penalty !== infinity) {
      mainLoop(node, index, ns);
    }
  });

  if (List.size(activeNodes) !== 0) {
    List.forEach(activeNodes, node => {
      if (node.data.demerits < tmp.data.demerits) {
        tmp = node;
      }
    });

    while (tmp !== null) {
      breaks.push({
        position: tmp.data.position,
        ratio: tmp.data.ratio
      });
      tmp = tmp.data.previous;
    }
  }

  const lineBreaks = breaks.reverse();
  return lineBreaks;
};

const cache = []
const values = []

export default (nodes, lines, settings = defaults()) => {
  const string = nodes.map(node => node.width || 0).join(" ").concat(lines.join(" "))
  const index = cache.indexOf(string)
  if (index >= 0) {
    return values[index]
  }
  let lineBreaks
  let tolerance = 0.1
  let step = 0.1
  while ((!lineBreaks || !lineBreaks.length)) {
    lineBreaks = linebreak(nodes, lines, {
      ...settings,
      tolerance
    })
    step *= 2
    tolerance += step
  }
  cache.push(string)
  values.push(lineBreaks)
  if (cache.length > 50) {
    cache.shift();
    values.shift();
  }
  return lineBreaks
}