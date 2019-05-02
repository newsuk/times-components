#!/usr/bin/python
# -*- coding: latin-1 -*-

import os
import shutil
import glob
import string
from bs4 import BeautifulSoup
from characters import CHARS

SVG_PATH = "../../dist/public/fonts"
OUT_PATH = "src/Text/fonts"
OUT_NAME = ".js"

def save_data( path , data ):
    f = open( path , 'w+')
    f.write( data )
    f.close()

def uconvert( value ):
    return str( ord( value ) )

def gconvert( value ):
    return "".join( value.split("_") )

def svg_to_txt():
    files = glob.glob( SVG_PATH + os.sep + '*.svg' )
    #target = 8
    #target_count = 0
    font_id = ""
    fonts = {}
    for j in files:
        #target_count = target_count + 1
        #if target_count > target:
        #    exit()
        #if target_count < target:
        #    continue
        
        file_name = j[4:-4]
        file_name = ' '.join( file_name.split( '_' ) )
        font_id = '_'.join( file_name.split( ' ' ) )
        print( file_name )
        svg_data = open( j , 'r' ).read()
        soup = BeautifulSoup( svg_data , 'lxml' )
        out = ''
        #track what font glyphs exist and only add in dependent kerning.
        font_glyphs = {}
        font_ligatures = {}

    #PROPERTY EXTRACTION
        default = 0
        #find missing-glyph elements
        target = soup.find_all('missing-glyph')
        for i in target:
            if i.has_attr('horiz-adv-x'):
                out += '0|missing|' + i['horiz-adv-x'] + '\n'
                
        #find font elements
        target = soup.find_all('font')
        for i in target:
            if i.has_attr('horiz-adv-x'):
                out += '0|default|' + i['horiz-adv-x']  + '\n'
                default = i['horiz-adv-x']

            if i.has_attr('id'):
                out += '0|id|' + i['id'] + '\n'


        #find font-face elements
        target = soup.find_all('font-face')
        for i in target:
            if i.has_attr('font-family') and i['font-family'] != "":
                out += '0|family|' + i['font-family']  + '\n'

            if i.has_attr('panose-1'):
                out += '0|panose|' + i['panose-1'] + '\n'

            if i.has_attr('descent'):
                out += '0|descent|' + i['descent'] + '\n'

            if i.has_attr('ascent'):
                out += '0|ascent|' + i['ascent'] + '\n'

            if i.has_attr('units-per-em'):
                out += '0|units|' + i['units-per-em']  + '\n'

            if i.has_attr('alphabetic'):
                out += '0|alphabetic|' + i['alphabetic']  + '\n'

            if i.has_attr('font-style'):
                out += '0|font-style|' + i['font-style']  + '\n'

            if i.has_attr('font-weight'):
                out += '0|font-weight|' + i['font-weight']  + '\n'

            if i.has_attr('font-stretch'):
                out += '0|font-stretch|' + i['font-stretch']  + '\n'

            if i.has_attr('cap-height'):
                out += '0|cap-height|' + i['cap-height']  + '\n'

            if i.has_attr('x-height'):
                out += '0|x-height|' + i['x-height']  + '\n'

            if i.has_attr('underline-position'):
                out += '0|underline-position|' + i['underline-position']  + '\n'

            if i.has_attr('underline-thickness'):
                out += '0|underline-thickness|' + i['underline-thickness']  + '\n'

    #GLYPH EXTRACTION

        #find glyph elements
        target = soup.find_all('glyph')
        for i in target:
            
            if i.has_attr('unicode'):
                if len( i['unicode'] ) > 1:
                    unicode_str = i['unicode']
                else:
                    unicode_str = str( ord( i['unicode'] ) )
                    if CHARS.has_key( unicode_str ) and CHARS[ unicode_str ] != 1:
                        unicode_str = CHARS[ unicode_str ]

                if CHARS.has_key( unicode_str ) == False:
                    #print missing chars for whitelist inclusion
                    if i.has_attr('glyph-name'):
                        print( 'CHARS[ "' + unicode_str + '" ] = 1' )
                    else:
                        print( 'CHARS[ "' + unicode_str + '" ] = 1 ' )
                    continue
                
                #normal chars
                if CHARS[ unicode_str ] == 1:
                    if i.has_attr('horiz-adv-x') and i.has_attr('d'):
                        out += '1|' + unicode_str + '|' + i['horiz-adv-x'] + '|' + i['d']  + '\n'

                    elif i.has_attr('d') and i.has_attr('horiz-adv-x') == False:
                        out += '1|' + unicode_str + '|' + str( default ) + '|' + i['d']  + '\n'

                    elif i.has_attr('d') == False and i.has_attr('horiz-adv-x') == True:
                        out += '1|' + unicode_str + '|' + i['horiz-adv-x'] + '|\n'


                    font_glyphs[ unicode_str ] = 1

                #ligatures
                else:
                    if i.has_attr('d') and i.has_attr('horiz-adv-x'):
                        out += '1|' + CHARS[ unicode_str ] + '|' + i['horiz-adv-x'] + '|' + i['d']  + '\n'

                    elif i.has_attr('d') and i.has_attr('horiz-adv-x') == False:
                        out += '1|' + CHARS[ unicode_str ] + '|' + str( default ) + '|' + i['d']  + '\n'

                    elif i.has_attr('d') == False and i.has_attr('horiz-adv-x') == True:
                        out += '1|' + CHARS[ unicode_str ] + '|' + i['horiz-adv-x'] + '|\n'

                    font_glyphs[ unicode_str ] = 1
                    font_glyphs[ CHARS[ unicode_str ] ] = 1
                    font_ligatures[ CHARS[ unicode_str ] ] = 1
                

    #KERNING EXTRACTION
    
        target = soup.find_all('hkern')
        for i in target:
            #print( i )
            char_1 = None
            char_2 = None
            char_offset = 0
            if i.has_attr('u1') and i.has_attr('u2') and i.has_attr('k'):
                #print( i['u1'] + ":" + i['u2'] + ":" + i['k'] )
                
                if "," in i['u1'] and len( i['u1'] ) > 1:
                    char_1 = i['u1'].split( ',' )
                    char_1 = map( uconvert , char_1 )
                else:
                    char_1 = map( uconvert , [ i['u1'] ] )

                if "," in i['u2'] and len( i['u2'] ) > 1:
                    char_2 = i['u2'].split( ',' )
                    char_2 = map( uconvert , char_2 )
                else:
                    char_2 = map( uconvert , [ i['u2'] ] )

                char_offset = i['k']

            elif i.has_attr('u1') and i.has_attr('g2') and i.has_attr('k'):
                #print( i['u1'] + ":" + i['g2'] + ":" + i['k'] )
                
                if "," in i['u1'] and len( i['u1'] ) > 1:
                    char_1 = i['u1'].split( ',' )
                    char_1 = map( uconvert , char_1 )
                else:
                    char_1 = map( uconvert , [ i['u1'] ] )

                if "," in i['g2'] and len( i['g2'] ) > 1:
                    char_2 = i['g2'].split( ',' )
                    char_2 = map( gconvert , char_2 )
                else:
                    char_2 = map( gconvert , [ i['g2'] ] )

                char_offset = i['k']

            elif i.has_attr('g1') and i.has_attr('u2') and i.has_attr('k'):
                #print( i['g1'] + ":" + i['u2'] + ":" + i['k'] )
                
                if "," in i['g1'] and len( i['g1'] ) > 1:
                    char_1 = i['g1'].split( ',' )
                    char_1 = map( gconvert , char_1 )
                else:
                    char_1 = map( gconvert , [ i['g1'] ] )

                if "," in i['u2'] and len( i['u2'] ) > 1:
                    char_2 = i['u2'].split( ',' )
                    char_2 = map( uconvert , char_2 )
                else:
                    char_2 = map( uconvert , [ i['u2'] ] )
                
                char_offset = i['k']

            elif i.has_attr('g1') and i.has_attr('g2') and i.has_attr('k'):
                #print( i['g1'] + ":" + i['g2'] + ":" + i['k'] )
                if "," in i['g1'] and len( i['g1'] ) > 1:
                    char_1 = i['g1'].split( ',' )
                    char_1 = map( gconvert , char_1 )
                else:
                    char_1 = map( gconvert , [ i['g1'] ] )

                if "," in i['g2'] and len( i['g2'] ) > 1:
                    char_2 = i['g2'].split( ',' )
                    char_2 = map( gconvert , char_2 )
                else:
                    char_2 = map( gconvert , [ i['g2'] ] )

                char_offset = i['k']

            else:
                print( "unknown kerning " )
                print( i )
                exit()

            for j in char_1:
                c_1 = j
                if CHARS.has_key( c_1 ) and CHARS[ c_1 ] != 1:
                    c_1 = CHARS[ c_1 ]
                
                if font_glyphs.has_key( c_1 ) == True and CHARS.has_key( c_1 ) == True:
                    for k in char_2:
                        c_2 = k
                        if CHARS.has_key( c_2 ) and CHARS[ c_2 ] != 1:
                            c_2 = CHARS[ c_2 ]
                        
                        if font_glyphs.has_key( c_2 ) == True and CHARS.has_key( c_2 ) == True:
                            out += '2|' + c_1 + '|' + c_2 + '|' + char_offset  + '\n'

        out += '3'
        for i in font_ligatures:
            out += '|' + i

        fonts[ font_id ] = True

        out = 'export default `' + out + '`;'
        
        save_data( OUT_PATH + os.sep + font_id.lower().split(os.sep)[-1] + OUT_NAME , out.encode('utf-8') )
        font_id = ""

svg_to_txt()
