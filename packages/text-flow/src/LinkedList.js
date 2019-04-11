/* eslint-disable no-param-reassign */

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.listSize = 0;
  }
}

export const size = list => list.listSize;

export const first = list => list.head;

export const forEach = (list, fun) => {
  let node = list.head;
  while (node !== null) {
    fun(node);
    node = node.next;
  }
};

export const isEmpty = list => list.listSize === 0;

export const isLinked = (list, node) =>
  !(
    (node &&
      node.prev === null &&
      node.next === null &&
      list.tail !== node &&
      list.head !== node) ||
    isEmpty(list)
  );

export const insertBefore = (list, node, newNode) => {
  if (!isLinked(list, node)) {
    return list;
  }
  newNode.prev = node.prev;
  newNode.next = node;
  if (node.prev === null) {
    list.head = newNode;
  } else {
    node.prev.next = newNode;
  }
  node.prev = newNode;
  list.listSize += 1;
  return list;
};

export const insertAfter = (list, node, newNode) => {
  if (!isLinked(list, node)) {
    return list;
  }
  newNode.prev = node;
  newNode.next = node.next;
  if (node.next === null) {
    list.tail = newNode;
  } else {
    node.next.prev = newNode;
  }
  node.next = newNode;
  list.listSize += 1;
  return list;
};

export const unshift = (list, node) => {
  if (list.head === null) {
    list.head = node;
    list.tail = node;
    node.prev = null;
    node.next = null;
    list.listSize += 1;
  } else {
    insertBefore(list, list.head, node);
  }
  return list;
};

export const push = (list, node) => {
  if (list.head === null) {
    unshift(list, node);
  } else {
    insertAfter(list, list.tail, node);
  }
  return list;
};

export const remove = (list, node) => {
  if (!isLinked(list, node)) {
    return list;
  }
  if (node.prev === null) {
    list.head = node.next;
  } else {
    node.prev.next = node.next;
  }
  if (node.next === null) {
    list.tail = node.prev;
  } else {
    node.next.prev = node.prev;
  }
  list.listSize -= 1;
  return list;
};

export class Node {
  prev = null;

  next = null;

  data = null;

  constructor(data) {
    this.data = data;
  }
}
