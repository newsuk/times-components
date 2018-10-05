package com.storybooknative;

import android.graphics.Paint
import android.graphics.Rect
import android.graphics.Typeface
import android.text.TextUtils
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import java.util.*

class ReactTextHelper : BaseJavaModule() {

    override fun getName(): String {
        return "ReactTextHelper"
    }

    @ReactMethod
    fun measureSlicePoint(text: String, dropCapSize: Int, bodySize: Int, viewWidth: Float, promise: Promise) {
        val fontFamily = "fonts/TimesDigitalW04.ttf"
        val textViewWidth = viewWidth - getDropCapWidth(
                text.substring(0, 1),
                fontFamily,
                dropCapSize
        )
        val slicePoint = getSlicePoint(
                text.substring(1),
                fontFamily,
                bodySize,
                textViewWidth
        )

        promise.resolve(
                Arguments.createMap().apply {
                    putInt("textViewWidth", textViewWidth.toInt())
                    putInt("slicePoint", slicePoint)
                }
        )
    }

    private fun getDropCapWidth(text: String, fontFamily: String, fontSize: Int): Int {
        val bounds = Rect()
        val paint = Paint()
        paint.textSize = fontSize.toFloat()
        val typeFace = Typeface.create(fontFamily, Typeface.NORMAL)
        paint.typeface = typeFace
        paint.getTextBounds(text, 0, text.length, bounds)
        return bounds.width()
    }


    private fun getSlicePoint(text: String, fontFamily: String, fontSize: Int, viewWidth: Float): Int {
        val paint = Paint()
        paint.textSize = fontSize.toFloat()
        val typeFace = Typeface.create(fontFamily, Typeface.NORMAL)
        paint.typeface = typeFace

        val strings = splitWordsIntoStringsThatFit(text, viewWidth, paint)

        return 3 + strings[0].length + strings[1].length + strings[2].length
    }

    private fun splitWordsIntoStringsThatFit(source: String, maxWidthPx: Float, paint: Paint): List<String> {
        val result = ArrayList<String>()

        val currentLine = ArrayList<String>()

        val sources = source.split("\\s".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
        for (chunk in sources) {
            if (paint.measureText(chunk) < maxWidthPx) {
                processFitChunk(maxWidthPx, paint, result, currentLine, chunk)
            } else {
                //the chunk is too big, split it.
                val splitChunk = splitIntoStringsThatFit(chunk, maxWidthPx, paint)
                for (chunkChunk in splitChunk) {
                    processFitChunk(maxWidthPx, paint, result, currentLine, chunkChunk)
                }
            }
        }

        if (!currentLine.isEmpty()) {
            result.add(TextUtils.join(" ", currentLine))
        }
        return result
    }

    /**
     * Splits a string to multiple strings each of which does not exceed the width
     * of maxWidthPx.
     */
    private fun splitIntoStringsThatFit(source: String, maxWidthPx: Float, paint: Paint): List<String> {
        if (TextUtils.isEmpty(source) || paint.measureText(source) <= maxWidthPx) {
            return Arrays.asList(source)
        }

        val result = ArrayList<String>()
        var start = 0
        for (i in 1..source.length) {
            val substr = source.substring(start, i)
            if (paint.measureText(substr) >= maxWidthPx) {
                //this one doesn't fit, take the previous one which fits
                val fits = source.substring(start, i - 1)
                result.add(fits)
                start = i - 1
            }
            if (i == source.length) {
                val fits = source.substring(start, i)
                result.add(fits)
            }
        }

        return result
    }

    /**
     * Processes the chunk which does not exceed maxWidth.
     */
    private fun processFitChunk(maxWidth: Float, paint: Paint, result: ArrayList<String>, currentLine: ArrayList<String>, chunk: String) {
        currentLine.add(chunk)
        val currentLineStr = TextUtils.join(" ", currentLine)
        if (paint.measureText(currentLineStr) >= maxWidth) {
            //remove chunk
            currentLine.removeAt(currentLine.size - 1)
            result.add(TextUtils.join(" ", currentLine))
            currentLine.clear()
            //ok because chunk fits
            currentLine.add(chunk)
        }
    }
}
