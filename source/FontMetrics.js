// ——————————————————————————————————————————————————
// Variables
// ——————————————————————————————————————————————————

let initialized = false
let padding
let context
let canvas

// ——————————————————————————————————————————————————
// Settings
// ——————————————————————————————————————————————————

const settings = {
  chars: {
    capHeight: 'S',
    baseline: 'n',
    xHeight: 'x',
    descent: 'p',
    ascent: 'h',
    tittle: 'i',
    overshoot: 'O',
    averages: {
      capHeight: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      baseline: "EFHILMPTYZfhimnrz", // chars with straight bottom
      xHeight: "acegmnopqrsuvwxyz",
      descent: "Qgjpqy",
      ascent: "bdfhklt",
      tittle: "ij",
      overshoot: "ABCDEFGHIJKLMNOPRSTUVWXYZabcdefhiklmnorstuvwxz",
      // extracted from here: https://opendata.stackexchange.com/a/19792
      // certainly better datasets, but we'd have to collect stats ourselves
      weights: {
        e: 0.08610229517681191,
        t: 0.0632964962389326,
        a: 0.0612553996079051,
        n: 0.05503703643138501,
        i: 0.05480626188138746,
        o: 0.0541904405334676,
        s: 0.0518864979648296,
        r: 0.051525029341199825,
        l: 0.03218192615049607,
        d: 0.03188948073064199,
        h: 0.02619237267611581,
        c: 0.02500268898936656,
        u: 0.019247776378510318,
        m: 0.018140172626462205,
        p: 0.017362092874808832,
        f: 0.015750347191785568,
        g: 0.012804659959943725,
        y: 0.010893686962847832,
        b: 0.01034644514338097,
        w: 0.009565830104169261,
        v: 0.007819143740853554,
        k: 0.004945712204424292,
        S: 0.0030896915651553373,
        T: 0.0030701064687671904,
        C: 0.002987392712176473,
        A: 0.0024774830020061096,
        x: 0.0023064144740073764,
        I: 0.0020910417959267183,
        M: 0.0018134911904778657,
        B: 0.0017387002075069484,
        P: 0.00138908405321239,
        E: 0.0012938206232079082,
        N: 0.0012758834637326799,
        F: 0.001220297284016159,
        R: 0.0011037374385216535,
        D: 0.0010927723198318497,
        U: 0.0010426370083657518,
        q: 0.00100853739070613,
        L: 0.0010044809306127922,
        G: 0.0009310209736100016,
        J: 0.0008814561018445294,
        H: 0.0008752446473266058,
        O: 0.0008210528757671701,
        W: 0.0008048270353938186,
        j: 0.000617596049210692,
        z: 0.0005762708620098124,
        K: 0.0003808001912620934,
        V: 0.0002556203680692448,
        Y: 0.00025194420110965734,
        Q: 0.00010001709417636208,
        Z: 0.00008619977698342993,
        X: 0.00006572732994986532
      }
    }
  }
}

// ——————————————————————————————————————————————————
// Methods
// ——————————————————————————————————————————————————

const initialize = () => {
  canvas = document.createElement('canvas')
  context = canvas.getContext('2d')
  initialized = true
}

const setFont = (fontFamily, fontSize, fontWeight) => {
  if (!initialized) initialize()
  padding = fontSize * 0.5
  canvas.width = fontSize * 2
  canvas.height = fontSize * 2 + padding
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  context.textBaseline = 'top'
  context.textAlign = 'center'
}

const setAlignment = (baseline = 'top') => {
  const ty = baseline === 'bottom' ? canvas.height : 0
  context.setTransform(1, 0, 0, 1, 0, ty)
  context.textBaseline = baseline
}

const updateText = (text) => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, padding, canvas.width)
}

const computeLineHeight = () => {
  const letter = 'A'
  setAlignment('bottom')
  const gutter = canvas.height - measureBottom(letter)
  setAlignment('top')
  return measureBottom(letter) + gutter
}

const getPixels = (text) => {
  updateText(text)
  return context.getImageData(0, 0, canvas.width, canvas.height).data
}

const getFirstIndex = (pixels) => {
  for (let i = 3, n = pixels.length; i < n; i += 4) {
    if (pixels[i] > 0) return (i - 3) / 4
  } return pixels.length
}

const getLastIndex = (pixels) => {
  for (let i = pixels.length - 1; i >= 3; i -= 4) {
    if (pixels[i] > 0) return i / 4
  } return 0
}

const normalize = (ref, obj, fontSize, origin) => {
  const offset = ref[origin];
  for (const key in obj){
    const v = obj[key];
    obj[key] = (v - offset) / fontSize;
  }
  return obj;
}

const measureTop = (text) => (
  Math.round(
    getFirstIndex(
      getPixels(text)
    ) / canvas.width
  ) - padding
)

const measureBottom = (text) => (
  Math.round(
    getLastIndex(
      getPixels(text)
    ) / canvas.width
  ) - padding
)

const metricSide = {
  // true = top, false = bottom
  capHeight: true,
  ascent: true,
  tittle: true,
  xHeight: true,
  baseline: false,
  overshoot: false,
  descent: false,
}

const getMetrics = (chars = settings.chars) => {
  const out = {
    top: 0,
    bottom: computeLineHeight(),
  };
  for (const k in metricSide)
    out[k] = (metricSide[k] ? measureTop : measureBottom)(chars[k]);
  return out;
}

// Calculate average for alphabet
const getAverages = (out) => {
  // init
  const sums = out.averages = {};
  const weights = out.weights = {};
  for (const k in metricSide)
    sums[k] = weights[k] = 0;
  // measure each character and do average
  const config = settings.chars.averages;
  for (const char in config.weights){
    const weight = config.weights[char];
    let top = null;
    let bottom = null;
    for (const k in metricSide){
      // character should be averaged for this metric?
      if (config[k].indexOf(char) === -1)
        continue;
      let val;
      if (metricSide[k]){
        if (top === null)
          top = measureTop(char);
        val = top;
      }
      else{
        if (bottom === null)
          bottom = measureBottom(char);
        val = bottom;
      }
      // add to average
      sums[k] += val*weight;
      weights[k] += weight;      
    }
  }
  // convert sum to average
  for (const k in sums)
    sums[k] /= weights[k];
}

// ——————————————————————————————————————————————————
// FontMetrics
// ——————————————————————————————————————————————————

const FontMetrics = ({
  fontFamily = 'Times',
  fontWeight = 'normal',
  fontSize = 200,
  origin = 'baseline',
  averages = false,
} = {}) => {
  setFont(fontFamily, fontSize, fontWeight);
  const m = getMetrics();
  const out = {
    ...normalize(m, m, fontSize, origin),
    fontFamily,
    fontWeight,
    fontSize
  };
  if (averages){
    getAverages(out);
    normalize(m, out.averages, fontSize, origin);
  }    
  return out;
}

FontMetrics.settings = settings

// ——————————————————————————————————————————————————
// Exports
// ——————————————————————————————————————————————————

export default FontMetrics
