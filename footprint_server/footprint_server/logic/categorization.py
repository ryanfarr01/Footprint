import re
import string
import numpy as np
from scipy.spatial.distance import hamming
from nltk.stem import WordNetLemmatizer
from footprint_server.shared import food_categories

_word_vec = {} # vector of words so we can convert to bag of words
_ind_to_word = {}
_s_cats = food_categories.SUB_CATEGORIES
SUB_CATS_BOW = {}
wl = WordNetLemmatizer()

def find_category(line):
    line_bow = _get_bow_representation(line)

    closest_bow = None
    closest_dist = -1.0
    for c in SUB_CATS_BOW.keys():
        ands = _bw_and(SUB_CATS_BOW[c], line_bow)
        new_dist = np.sum(ands)
        if new_dist > closest_dist and new_dist > 0.5:
            closest_dist = new_dist
            closest_bow = c

    if closest_bow is None: return None
    return _s_cats[closest_bow], closest_bow

def _bw_and(arr1, arr2):
    ret = 0
    for i in range(len(arr1)):
        n1 = arr1[i]
        n2 = arr2[i]
        
        if n1 > 0.0 and n2 > 0.0:
            if _ind_to_word[i] == 'organic':
                ret += 0.25
            else:
                ret += 1
    return ret

def _create_sub_cats_bow():
    all_lines = []
    for c in _s_cats.keys():
        all_lines.append(_convert_line(c))
    _create_word_vec(all_lines)

    for c in _s_cats.keys():
        SUB_CATS_BOW[c] = _get_bow_representation(c)
        
def _get_bow_representation(line):
    l = _convert_line(line)
    ret = np.zeros(len(_word_vec))
    for word in l:
        if word in _word_vec:
            ret[_word_vec[word]] = 1
    return ret

translator = ''.maketrans('', '', string.punctuation)
def _convert_line(line):
    l = line.lower()
    l = l.replace('/', ' ')
    l = l.translate(translator)
    word_tokens = l.split(' ')

    ret_l = []
    for word in word_tokens:
        ret_l.append(wl.lemmatize(word))
    return ret_l

def _create_word_vec(all_lines):
    for line in all_lines:
        for word in line:
            if word not in _word_vec:
                ind = len(_word_vec)
                _word_vec[word] = ind
                _ind_to_word[ind] = word

_create_sub_cats_bow()
