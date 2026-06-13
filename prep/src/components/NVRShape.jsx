const PATHS = {
  triangle:  'M 40 10 L 70 70 L 10 70 Z',
  diamond:   'M 40 10 L 70 40 L 40 70 L 10 40 Z',
  pentagon:  'M 40 8 L 70 30 L 60 68 L 20 68 L 10 30 Z',
  hexagon:   'M 40 8 L 66 24 L 66 56 L 40 72 L 14 56 L 14 24 Z',
  star:      'M 40 8 L 48 29 L 71 29 L 53 46 L 60 68 L 40 54 L 20 68 L 27 46 L 9 29 L 32 29 Z',
  cross:     'M 28 10 L 52 10 L 52 28 L 70 28 L 70 52 L 52 52 L 52 70 L 28 70 L 28 52 L 10 52 L 10 28 L 28 28 Z',
  arrow:     'M 10 32 L 48 32 L 48 18 L 70 40 L 48 62 L 48 48 L 10 48 Z',
}

const SIZES = { small: 0.5, medium: 1, large: 1 }

function getFill(fill, id) {
  switch (fill) {
    case 'solid':   return '#1e293b'
    case 'outline': return 'none'
    case 'striped': return `url(#striped-${id})`
    case 'dotted':  return `url(#dotted-${id})`
    default:        return '#1e293b'
  }
}

let idCounter = 0

export default function NVRShape({ shape, pixelSize = 64, className = '' }) {
  if (!shape) {
    return (
      <svg width={pixelSize} height={pixelSize} viewBox="0 0 80 80" className={className}>
        <text x="40" y="45" textAnchor="middle" fontSize="24" fill="#94a3b8">?</text>
      </svg>
    )
  }

  const uid = `nvr-${idCounter++}`
  const { type = 'circle', fill = 'solid', size = 'medium', rotation = 0, inner } = shape
  const stroke = '#1e293b'
  const strokeW = 2.5
  const fillVal = getFill(fill, uid)
  const rot = rotation % 360

  const sizeFactor = size === 'small' ? 0.55 : size === 'large' ? 1 : 0.78
  const transform = `rotate(${rot}, 40, 40) scale(${sizeFactor}) translate(${40 * (1 - sizeFactor) / sizeFactor} ${40 * (1 - sizeFactor) / sizeFactor})`

  const shapeEl = (t, f, r, sw = strokeW) => {
    const props = { fill: f, stroke, strokeWidth: sw }
    switch (t) {
      case 'circle':    return <circle cx="40" cy="40" r="30" {...props} />
      case 'square':    return <rect x="10" y="10" width="60" height="60" {...props} />
      case 'rectangle': return <rect x="6" y="20" width="68" height="40" {...props} />
      default: {
        const d = PATHS[t] || PATHS.triangle
        return <path d={d} {...props} />
      }
    }
  }

  const innerSf = 0.38
  const innerFill = inner ? getFill(inner.fill, `${uid}-inner`) : 'none'
  const innerRot = inner ? (inner.rotation || 0) : 0

  return (
    <svg width={pixelSize} height={pixelSize} viewBox="0 0 80 80" className={className}>
      <defs>
        <pattern id={`striped-${uid}`} patternUnits="userSpaceOnUse" width="8" height="8">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1e293b" strokeWidth="3.5" />
        </pattern>
        <pattern id={`dotted-${uid}`} patternUnits="userSpaceOnUse" width="10" height="10">
          <circle cx="5" cy="5" r="2" fill="#1e293b" />
        </pattern>
        {inner && (
          <>
            <pattern id={`striped-${uid}-inner`} patternUnits="userSpaceOnUse" width="6" height="6">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#1e293b" strokeWidth="2" />
            </pattern>
            <pattern id={`dotted-${uid}-inner`} patternUnits="userSpaceOnUse" width="7" height="7">
              <circle cx="3.5" cy="3.5" r="1.5" fill="#1e293b" />
            </pattern>
          </>
        )}
      </defs>

      <g transform={`rotate(${rot}, 40, 40)`}>
        {shapeEl(type, fillVal, rot)}
      </g>

      {inner && (
        <g transform={`rotate(${innerRot}, 40, 40) scale(${innerSf}) translate(${40 * (1 - innerSf) / innerSf} ${40 * (1 - innerSf) / innerSf})`}>
          {shapeEl(inner.type, innerFill, innerRot, 2)}
        </g>
      )}
    </svg>
  )
}
