const d3Scale = require('d3-scale')
const xxhash = require('xxhashjs')
const debug = require('debug')('swagger-names')

// const famousPeople = require('./famous-people')
const animalNames = require('./animal-names')
const adjectives = require('./adjectives')
const MAX_UINT32 = 4294967295 // 2^32 - // 1
const V1 = 100 // Version 1 Seed

const lefts = adjectives
const rights = animalNames

const leftLength = lefts.length
const rightLength = rights.length

const useLeft = leftLength >= rightLength
const biggerLength = useLeft ? leftLength : rightLength

module.exports = getName

// Combine a coord into a single int ( over fixed coord space )
const pairFn = (x,y) => useLeft
    ? (y * biggerLength) + x
    : (x * biggerLength) + y

// Split an integer that has been previously combined
const unpairFn = (z) => {
  if(!z) {
    return [0,0]
  }

  var a = z % biggerLength
  var b = Math.floor(z / biggerLength)
  return useLeft ? [a,b] : [b,a]
}

const MAX_PAIR = pairFn(leftLength - 1, rightLength - 1)
debug("MAX_PAIR", MAX_PAIR)
debug("leftLength", leftLength)
debug("rightLength", rightLength)


// Map our hash to a pair
const maxU32ToPairFloat = d3Scale.scaleLinear()
      .domain([0, MAX_UINT32])
      .range([0, MAX_PAIR])
const maxU32ToPair = (u32) => Math.floor(maxU32ToPairFloat(u32))

/*
  The names should be deterministic
  Ie: same input string, same names
*/
function getName(str) {
  var hashInt = xxhash.h32(str, V1).toNumber()
  var pairInt = maxU32ToPair(hashInt)
  var pair = unpairFn(pairInt)

  debug("hash", hashInt, "pairInt", pairInt, "pair", pair)
  return lefts[pair[0]] + '_' + rights[pair[1]]
}
