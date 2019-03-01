/* eslint-env browser */
import React, { Component } from "react";
import { propTypes, defaultProps } from "./video-prop-types";
import SkySportsBanner from "./sky-sports-banner";

const static360PlayIcon =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTA4cHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCAxMDggMTAwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1My4yICg3MjY0MykgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJTcG90LUNvbW1lbnRpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIzNjAtVmlkZW8tU3RhdGljIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjY3LjAwMDAwMCwgLTE3Ni4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY2Ny4wMDAwMDAsIDE3Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuMiIgY3g9IjUwIiBjeT0iNTAiIHI9IjQ3Ij48L2NpcmNsZT4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05OS42MDQ1ODMzLDU2LjMxODQyODMgQzk2LjQ5ODYyMzksODAuOTQ5NzM4NyA3NS40NzQwMjU0LDEwMCA1MCwxMDAgQzIyLjM4NTc2MjUsMTAwIDEuMDY1ODE0MWUtMTMsNzcuNjE0MjM3NSAxLjA2NTgxNDFlLTEzLDUwIEMxLjA2NTgxNDFlLTEzLDIyLjM4NTc2MjUgMjIuMzg1NzYyNSwwIDUwLDAgQzc1LjkyNjc0MDUsMCA5Ny4yNDQ1MDE2LDE5LjczMzM4NjUgOTkuNzUzMTIzOCw0NSBMOTYuNzM3MTgxOSw0NSBDOTQuMjQwODU1NiwyMS4zOTMzNjY3IDc0LjI2ODQyODMsMyA1MCwzIEMyNC4wNDI2MTY4LDMgMywyNC4wNDI2MTY4IDMsNTAgQzMsNzUuOTU3MzgzMiAyNC4wNDI2MTY4LDk3IDUwLDk3IEM3My44NjM0NzUxLDk3IDkzLjU3MzEyMjksNzkuMjE1MzUwOCA5Ni41OTc2ODA5LDU2LjE3NzMxNDYgTDg4LjYsNjEgTDg4LjYsNTkuMzk0MTE4MyBMOTguMDE4NDExOCw1MCBMMTA3LjYsNTkuMzk0MTE4MyBMMTA3LjYsNjEgTDk5LjYwNDU4MzMsNTYuMzE4NDI4MyBaIE0yNCw2MC43NzQyODU3IEwyNCw1Ny40NDI4NTcxIEMyNS40NDU3MTQzLDU4LjM1NDI4NTcgMjcuMDQ4NTcxNCw1OC45NTE0Mjg2IDI4LjcxNDI4NTcsNTguOTUxNDI4NiBDMzAuMjg1NzE0Myw1OC45NTE0Mjg2IDMyLjEwODU3MTQsNTguMTAyODU3MSAzMi4xMDg1NzE0LDU1LjU4ODU3MTQgQzMyLjEwODU3MTQsNTMuODkxNDI4NiAzMS4xNjU3MTQzLDUyLjA2ODU3MTQgMjcuNjQ1NzE0Myw1Mi4wNjg1NzE0IEwyNy42NDU3MTQzLDQ5LjI0IEMzMC4xMjg1NzE0LDQ5LjI0IDMxLjk1MTQyODYsNDguNDIyODU3MSAzMS45NTE0Mjg2LDQ2LjAwMjg1NzEgQzMxLjk1MTQyODYsNDQuNTU3MTQyOSAzMC45NDU3MTQzLDQyLjc5NzE0MjkgMjguMjQyODU3MSw0Mi43OTcxNDI5IEMyNi41NzcxNDI5LDQyLjc5NzE0MjkgMjUuMjg4NTcxNCw0My40NTcxNDI5IDI0LjUzNDI4NTcsNDMuODM0Mjg1NyBMMjQuNTM0Mjg1Nyw0MC45MTE0Mjg2IEMyNS45OCw0MC4xODg1NzE0IDI3LjMzMTQyODYsNDAgMjguNjIsNDAgQzMyLjE0LDQwIDM0Ljk2ODU3MTQsNDEuODU0Mjg1NyAzNC45Njg1NzE0LDQ1Ljc1MTQyODYgQzM0Ljk2ODU3MTQsNDguODMxNDI4NiAzMy4xNzcxNDI5LDQ5LjkgMzIuMjM0Mjg1Nyw1MC40MDI4NTcxIEMzNC41Mjg1NzE0LDUxLjE4ODU3MTQgMzUuMzE0Mjg1Nyw1My41MTQyODU3IDM1LjMxNDI4NTcsNTUuNDk0Mjg1NyBDMzUuMzE0Mjg1Nyw1OS41MTcxNDI5IDMyLjIwMjg1NzEsNjIgMjguNzc3MTQyOSw2MiBDMjcuNzQsNjIgMjYuMDQyODU3MSw2MS44NDI4NTcxIDI0LDYwLjc3NDI4NTcgWiBNNDcuNjY1NzE0Myw0MCBMNDkuNTIsNDIuMzU3MTQyOSBDNDQuNTg1NzE0Myw0NS41MzE0Mjg2IDQzLjQ1NDI4NTcsNDguNzM3MTQyOSA0Mi45NTE0Mjg2LDUwLjIxNDI4NTcgQzQ0LjYxNzE0MjksNDkuMzM0Mjg1NyA0NS45Njg1NzE0LDQ5LjMzNDI4NTcgNDYuMzQ1NzE0Myw0OS4zMzQyODU3IEM0OS41NTE0Mjg2LDQ5LjMzNDI4NTcgNTIuMzE3MTQyOSw1MS44OCA1Mi4zMTcxNDI5LDU1LjUyNTcxNDMgQzUyLjMxNzE0MjksNTkuMTcxNDI4NiA0OS40MjU3MTQzLDYyIDQ1Ljg3NDI4NTcsNjIgQzQzLjIwMjg1NzEsNjIgMzkuMDg1NzE0Myw2MC4yMDg1NzE0IDM5LjA4NTcxNDMsNTQuMjY4NTcxNCBDMzkuMDg1NzE0Myw1MC43NDg1NzE0IDQwLjUsNDcuMTAyODU3MSA0My4xMDg1NzE0LDQ0LjAyMjg1NzEgQzQ0LjYxNzE0MjksNDIuMjMxNDI4NiA0NS45MzcxNDI5LDQxLjI1NzE0MjkgNDcuNjY1NzE0Myw0MCBaIE00Mi4yOTE0Mjg2LDUzLjM4ODU3MTQgQzQyLjIyODU3MTQsNTMuNzY1NzE0MyA0Mi4xNjU3MTQzLDU0LjE3NDI4NTcgNDIuMTY1NzE0Myw1NS4wMjI4NTcxIEM0Mi4xNjU3MTQzLDU3LjkxNDI4NTcgNDQuMjcxNDI4Niw1OS4xNCA0NS45MDU3MTQzLDU5LjE0IEM0Ny42MzQyODU3LDU5LjE0IDQ5LjMsNTcuODUxNDI4NiA0OS4zLDU1LjYyIEM0OS4zLDUzLjA3NDI4NTcgNDcuMjI1NzE0Myw1Mi4xNjI4NTcxIDQ1LjU5MTQyODYsNTIuMTYyODU3MSBDNDQuMDIsNTIuMTYyODU3MSA0My4xMDg1NzE0LDUyLjgyMjg1NzEgNDIuMjkxNDI4Niw1My4zODg1NzE0IFogTTYxLjQsNDAgQzY1LjI2NTcxNDMsNDAgNjguMTg4NTcxNCw0NC40NjI4NTcxIDY4LjE4ODU3MTQsNTAuOTM3MTQyOSBDNjguMTg4NTcxNCw1Ny43MjU3MTQzIDY1LjE3MTQyODYsNjIgNjEuMjc0Mjg1Nyw2MiBDNTcuMjgyODU3MSw2MiA1NC4zNiw1Ny44MiA1NC4zNiw1MSBDNTQuMzYsNDMuNjc3MTQyOSA1Ny45MTE0Mjg2LDQwIDYxLjQsNDAgWiBNNjEuMjc0Mjg1Nyw0Mi45MjI4NTcxIEM1OS40Miw0Mi45MjI4NTcxIDU3LjQ0LDQ1LjA2IDU3LjQ0LDUwLjkzNzE0MjkgQzU3LjQ0LDU3LjU2ODU3MTQgNTkuNjcxNDI4Niw1OS4wNzcxNDI5IDYxLjI0Mjg1NzEsNTkuMDc3MTQyOSBDNjIuODc3MTQyOSw1OS4wNzcxNDI5IDY1LjEwODU3MTQsNTcuNDQyODU3MSA2NS4xMDg1NzE0LDUxLjAzMTQyODYgQzY1LjEwODU3MTQsNDMuNzA4NTcxNCA2Mi4xODU3MTQzLDQyLjkyMjg1NzEgNjEuMjc0Mjg1Nyw0Mi45MjI4NTcxIFogTTcxLjA4LDQ0LjI0Mjg1NzEgQzcxLjA4LDQxLjg4NTcxNDMgNzIuOTk3MTQyOSw0MCA3NS4zNTQyODU3LDQwIEM3Ny43MTE0Mjg2LDQwIDc5LjU5NzE0MjksNDEuODg1NzE0MyA3OS41OTcxNDI5LDQ0LjI0Mjg1NzEgQzc5LjU5NzE0MjksNDYuNjMxNDI4NiA3Ny42OCw0OC41MTcxNDI5IDc1LjM1NDI4NTcsNDguNTE3MTQyOSBDNzMuMDI4NTcxNCw0OC41MTcxNDI5IDcxLjA4LDQ2LjYzMTQyODYgNzEuMDgsNDQuMjQyODU3MSBaIE03Mi43NDU3MTQzLDQ0LjI0Mjg1NzEgQzcyLjc0NTcxNDMsNDUuNjg4NTcxNCA3My45NCw0Ni44NTE0Mjg2IDc1LjM1NDI4NTcsNDYuODUxNDI4NiBDNzYuNzY4NTcxNCw0Ni44NTE0Mjg2IDc3LjkzMTQyODYsNDUuNjg4NTcxNCA3Ny45MzE0Mjg2LDQ0LjI0Mjg1NzEgQzc3LjkzMTQyODYsNDIuODI4NTcxNCA3Ni43Njg1NzE0LDQxLjY2NTcxNDMgNzUuMzU0Mjg1Nyw0MS42NjU3MTQzIEM3My45MDg1NzE0LDQxLjY2NTcxNDMgNzIuNzQ1NzE0Myw0Mi44Mjg1NzE0IDcyLjc0NTcxNDMsNDQuMjQyODU3MSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
const hover360PlayIcon =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTA4cHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCAxMDggMTAwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1My4yICg3MjY0MykgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+R3JvdXAgMjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJTcG90LUNvbW1lbnRpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSIzNjAtVmlkZW8tSG92ZXIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NjcuMDAwMDAwLCAtMTc2LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjY3LjAwMDAwMCwgMTc2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzAwMDAwMCIgb3BhY2l0eT0iMC42MDA3NzE5NDkiIGN4PSI1MCIgY3k9IjUwIiByPSI0NyI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTkuNjA0NTgzMyw1Ni4zMTg0MjgzIEM5Ni40OTg2MjM5LDgwLjk0OTczODcgNzUuNDc0MDI1NCwxMDAgNTAsMTAwIEMyMi4zODU3NjI1LDEwMCAxLjA2NTgxNDFlLTEzLDc3LjYxNDIzNzUgMS4wNjU4MTQxZS0xMyw1MCBDMS4wNjU4MTQxZS0xMywyMi4zODU3NjI1IDIyLjM4NTc2MjUsMCA1MCwwIEM3NS45MjY3NDA1LDAgOTcuMjQ0NTAxNiwxOS43MzMzODY1IDk5Ljc1MzEyMzgsNDUgTDk2LjczNzE4MTksNDUgQzk0LjI0MDg1NTYsMjEuMzkzMzY2NyA3NC4yNjg0MjgzLDMgNTAsMyBDMjQuMDQyNjE2OCwzIDMsMjQuMDQyNjE2OCAzLDUwIEMzLDc1Ljk1NzM4MzIgMjQuMDQyNjE2OCw5NyA1MCw5NyBDNzMuODYzNDc1MSw5NyA5My41NzMxMjI5LDc5LjIxNTM1MDggOTYuNTk3NjgwOSw1Ni4xNzczMTQ2IEw4OC42LDYxIEw4OC42LDU5LjM5NDExODMgTDk4LjAxODQxMTgsNTAgTDEwNy42LDU5LjM5NDExODMgTDEwNy42LDYxIEw5OS42MDQ1ODMzLDU2LjMxODQyODMgWiBNMjQsNjAuNzc0Mjg1NyBMMjQsNTcuNDQyODU3MSBDMjUuNDQ1NzE0Myw1OC4zNTQyODU3IDI3LjA0ODU3MTQsNTguOTUxNDI4NiAyOC43MTQyODU3LDU4Ljk1MTQyODYgQzMwLjI4NTcxNDMsNTguOTUxNDI4NiAzMi4xMDg1NzE0LDU4LjEwMjg1NzEgMzIuMTA4NTcxNCw1NS41ODg1NzE0IEMzMi4xMDg1NzE0LDUzLjg5MTQyODYgMzEuMTY1NzE0Myw1Mi4wNjg1NzE0IDI3LjY0NTcxNDMsNTIuMDY4NTcxNCBMMjcuNjQ1NzE0Myw0OS4yNCBDMzAuMTI4NTcxNCw0OS4yNCAzMS45NTE0Mjg2LDQ4LjQyMjg1NzEgMzEuOTUxNDI4Niw0Ni4wMDI4NTcxIEMzMS45NTE0Mjg2LDQ0LjU1NzE0MjkgMzAuOTQ1NzE0Myw0Mi43OTcxNDI5IDI4LjI0Mjg1NzEsNDIuNzk3MTQyOSBDMjYuNTc3MTQyOSw0Mi43OTcxNDI5IDI1LjI4ODU3MTQsNDMuNDU3MTQyOSAyNC41MzQyODU3LDQzLjgzNDI4NTcgTDI0LjUzNDI4NTcsNDAuOTExNDI4NiBDMjUuOTgsNDAuMTg4NTcxNCAyNy4zMzE0Mjg2LDQwIDI4LjYyLDQwIEMzMi4xNCw0MCAzNC45Njg1NzE0LDQxLjg1NDI4NTcgMzQuOTY4NTcxNCw0NS43NTE0Mjg2IEMzNC45Njg1NzE0LDQ4LjgzMTQyODYgMzMuMTc3MTQyOSw0OS45IDMyLjIzNDI4NTcsNTAuNDAyODU3MSBDMzQuNTI4NTcxNCw1MS4xODg1NzE0IDM1LjMxNDI4NTcsNTMuNTE0Mjg1NyAzNS4zMTQyODU3LDU1LjQ5NDI4NTcgQzM1LjMxNDI4NTcsNTkuNTE3MTQyOSAzMi4yMDI4NTcxLDYyIDI4Ljc3NzE0MjksNjIgQzI3Ljc0LDYyIDI2LjA0Mjg1NzEsNjEuODQyODU3MSAyNCw2MC43NzQyODU3IFogTTQ3LjY2NTcxNDMsNDAgTDQ5LjUyLDQyLjM1NzE0MjkgQzQ0LjU4NTcxNDMsNDUuNTMxNDI4NiA0My40NTQyODU3LDQ4LjczNzE0MjkgNDIuOTUxNDI4Niw1MC4yMTQyODU3IEM0NC42MTcxNDI5LDQ5LjMzNDI4NTcgNDUuOTY4NTcxNCw0OS4zMzQyODU3IDQ2LjM0NTcxNDMsNDkuMzM0Mjg1NyBDNDkuNTUxNDI4Niw0OS4zMzQyODU3IDUyLjMxNzE0MjksNTEuODggNTIuMzE3MTQyOSw1NS41MjU3MTQzIEM1Mi4zMTcxNDI5LDU5LjE3MTQyODYgNDkuNDI1NzE0Myw2MiA0NS44NzQyODU3LDYyIEM0My4yMDI4NTcxLDYyIDM5LjA4NTcxNDMsNjAuMjA4NTcxNCAzOS4wODU3MTQzLDU0LjI2ODU3MTQgQzM5LjA4NTcxNDMsNTAuNzQ4NTcxNCA0MC41LDQ3LjEwMjg1NzEgNDMuMTA4NTcxNCw0NC4wMjI4NTcxIEM0NC42MTcxNDI5LDQyLjIzMTQyODYgNDUuOTM3MTQyOSw0MS4yNTcxNDI5IDQ3LjY2NTcxNDMsNDAgWiBNNDIuMjkxNDI4Niw1My4zODg1NzE0IEM0Mi4yMjg1NzE0LDUzLjc2NTcxNDMgNDIuMTY1NzE0Myw1NC4xNzQyODU3IDQyLjE2NTcxNDMsNTUuMDIyODU3MSBDNDIuMTY1NzE0Myw1Ny45MTQyODU3IDQ0LjI3MTQyODYsNTkuMTQgNDUuOTA1NzE0Myw1OS4xNCBDNDcuNjM0Mjg1Nyw1OS4xNCA0OS4zLDU3Ljg1MTQyODYgNDkuMyw1NS42MiBDNDkuMyw1My4wNzQyODU3IDQ3LjIyNTcxNDMsNTIuMTYyODU3MSA0NS41OTE0Mjg2LDUyLjE2Mjg1NzEgQzQ0LjAyLDUyLjE2Mjg1NzEgNDMuMTA4NTcxNCw1Mi44MjI4NTcxIDQyLjI5MTQyODYsNTMuMzg4NTcxNCBaIE02MS40LDQwIEM2NS4yNjU3MTQzLDQwIDY4LjE4ODU3MTQsNDQuNDYyODU3MSA2OC4xODg1NzE0LDUwLjkzNzE0MjkgQzY4LjE4ODU3MTQsNTcuNzI1NzE0MyA2NS4xNzE0Mjg2LDYyIDYxLjI3NDI4NTcsNjIgQzU3LjI4Mjg1NzEsNjIgNTQuMzYsNTcuODIgNTQuMzYsNTEgQzU0LjM2LDQzLjY3NzE0MjkgNTcuOTExNDI4Niw0MCA2MS40LDQwIFogTTYxLjI3NDI4NTcsNDIuOTIyODU3MSBDNTkuNDIsNDIuOTIyODU3MSA1Ny40NCw0NS4wNiA1Ny40NCw1MC45MzcxNDI5IEM1Ny40NCw1Ny41Njg1NzE0IDU5LjY3MTQyODYsNTkuMDc3MTQyOSA2MS4yNDI4NTcxLDU5LjA3NzE0MjkgQzYyLjg3NzE0MjksNTkuMDc3MTQyOSA2NS4xMDg1NzE0LDU3LjQ0Mjg1NzEgNjUuMTA4NTcxNCw1MS4wMzE0Mjg2IEM2NS4xMDg1NzE0LDQzLjcwODU3MTQgNjIuMTg1NzE0Myw0Mi45MjI4NTcxIDYxLjI3NDI4NTcsNDIuOTIyODU3MSBaIE03MS4wOCw0NC4yNDI4NTcxIEM3MS4wOCw0MS44ODU3MTQzIDcyLjk5NzE0MjksNDAgNzUuMzU0Mjg1Nyw0MCBDNzcuNzExNDI4Niw0MCA3OS41OTcxNDI5LDQxLjg4NTcxNDMgNzkuNTk3MTQyOSw0NC4yNDI4NTcxIEM3OS41OTcxNDI5LDQ2LjYzMTQyODYgNzcuNjgsNDguNTE3MTQyOSA3NS4zNTQyODU3LDQ4LjUxNzE0MjkgQzczLjAyODU3MTQsNDguNTE3MTQyOSA3MS4wOCw0Ni42MzE0Mjg2IDcxLjA4LDQ0LjI0Mjg1NzEgWiBNNzIuNzQ1NzE0Myw0NC4yNDI4NTcxIEM3Mi43NDU3MTQzLDQ1LjY4ODU3MTQgNzMuOTQsNDYuODUxNDI4NiA3NS4zNTQyODU3LDQ2Ljg1MTQyODYgQzc2Ljc2ODU3MTQsNDYuODUxNDI4NiA3Ny45MzE0Mjg2LDQ1LjY4ODU3MTQgNzcuOTMxNDI4Niw0NC4yNDI4NTcxIEM3Ny45MzE0Mjg2LDQyLjgyODU3MTQgNzYuNzY4NTcxNCw0MS42NjU3MTQzIDc1LjM1NDI4NTcsNDEuNjY1NzE0MyBDNzMuOTA4NTcxNCw0MS42NjU3MTQzIDcyLjc0NTcxNDMsNDIuODI4NTcxNCA3Mi43NDU3MTQzLDQ0LjI0Mjg1NzEgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";

const css = `
.video-js.vjs-has-started video:not([data-player="default"]) ~ button {
  display: none;
}

.video-js video[data-player="default"] ~ button {
  width: 70px;
  height: 70px;
  margin-top: -35px;
  margin-left: -35px;
  background: rgba(0, 0, 0, 0.4);
  line-height: 65px;
  border-radius: 0;
  border-style: solid;
  border-width: 3px;
  border-color: white;
}

.video-js video:not([data-player="default"]) ~ button span {
  display: none;
}

.video-js video:not([data-player="default"]) ~ button, .video-js video:not([data-player="default"]) ~ button:hover {
  display: block;
  background: none !important;
  margin: 0;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
}

.video-js video:not([data-player="default"]) ~ button:before {
    content: url(${static360PlayIcon});
    width: 100px;
    height: 100px;
}

.video-js video:not([data-player="default"]) ~ button:hover:before {
  content: url(${hover360PlayIcon});
}

.video-js .vjs-big-play-button:before {
  font-size: 60px;
  left: -2px;
}

.video-js .vjs-dock-text {
  visibility: hidden;
}

.video-js .vjs-poster {
  background-size: cover;
}

.video-js .vjs-tech {
  position: relative;
}
`;

class InlineVideoPlayer extends Component {
  static index = 0;

  static scriptLoadError = false;

  static activePlayers = [];

  static brightcoveSDKLoadedStarted = false;

  static brightcoveSDKHasLoaded() {
    return !!(window.bc && window.videojs);
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static attachStyles() {
    const styleTag = document.createElement("style");
    styleTag.type = "text/css";
    const cssText = document.createTextNode(css);
    styleTag.appendChild(cssText);
    document.head.appendChild(styleTag);
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      showSkyBanner: props.skySports
    };

    InlineVideoPlayer.index += 1;
    this.id = `${props.videoId}-${props.accountId}-${InlineVideoPlayer.index}`;
  }

  componentDidMount() {
    if (InlineVideoPlayer.scriptLoadError) {
      this.handleError(InlineVideoPlayer.scriptLoadError);
    }

    this.loadBrightcoveSDKIfRequired();

    InlineVideoPlayer.activePlayers.push(this);

    if (InlineVideoPlayer.brightcoveSDKHasLoaded()) {
      this.initBrightcove();
    }
  }

  componentWillUnmount() {
    InlineVideoPlayer.activePlayers.splice(
      InlineVideoPlayer.activePlayers.indexOf(this)
    );
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }

  handleError = () => {
    this.setState({ error: true });
  };

  handlePlay = () => {
    this.hideSkyBanner();

    InlineVideoPlayer.activePlayers.forEach(video => {
      if (video !== this && video.player) {
        video.player.pause();
      }
    });
  };

  hideSkyBanner = () => {
    this.setState({ showSkyBanner: false });
  };

  loadBrightcoveSDKIfRequired() {
    if (!InlineVideoPlayer.brightcoveSDKLoadedStarted) {
      InlineVideoPlayer.brightcoveSDKLoadedStarted = true;

      const s = this.createBrightcoveScript();

      s.onload = () => {
        InlineVideoPlayer.activePlayers.forEach(player => player.initVideojs());
      };

      s.onerror = () => {
        InlineVideoPlayer.scriptLoadError = "Brightcove script failed to load";
        InlineVideoPlayer.activePlayers.forEach(player => player.handleError());
      };

      InlineVideoPlayer.appendScript(s);
      InlineVideoPlayer.attachStyles();
    }
  }

  createBrightcoveScript() {
    const { accountId, playerId } = this.props;
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;

    return s;
  }

  initVideojs() {
    this.player = window.videojs(this.id);
    this.player.ready(() => {
      this.player.contextmenu({ disabled: true });
    });
    this.player.on("error", this.handleError);
    this.player.on("play", this.handlePlay);
  }

  initBrightcove() {
    window.bc(document.getElementById(this.id));

    this.initVideojs();
  }

  render() {
    const { width, height, poster, videoId, accountId, playerId } = this.props;
    const { error, showSkyBanner } = this.state;

    if (error) {
      throw new Error(); // caught by parent ErrorView
    }

    return (
      /* eslint jsx-a11y/media-has-caption: "off" */
      // Added a wrapping div as brightcove adds siblings to the video tag
      <div data-testid="video-component" style={{ height, width }}>
        <div style={{ position: "relative" }}>
          {showSkyBanner && <SkySportsBanner />}
          <video
            id={this.id}
            style={{ height, width }}
            {...(poster ? { poster: poster.uri } : {})}
            className="video-js"
            controls
            data-account={accountId}
            data-application-id
            data-embed="default"
            data-player={playerId}
            data-video-id={videoId}
          />
        </div>
      </div>
    );
  }
}

InlineVideoPlayer.defaultProps = defaultProps;
InlineVideoPlayer.propTypes = propTypes;

export default InlineVideoPlayer;
