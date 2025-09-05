const eqnDisplay = document.querySelector('.eqn-display');
const ansDisplay = document.querySelector('.ans-display');
const buttons = document.querySelectorAll('.sci-keys-btn, .calc-btn');

let currentEquation = '';
let lastAnswer = 0;


// RENDER EQUATION WITH MATHJAX

function renderEquation() {
  let displayEquation = currentEquation
    .replace(/\*/g, '\\times')
    .replace(/\//g, '\\div')
    .replace(/Math\.PI/g, '\\pi')
    .replace(/Math\.pow\(([^,]+),([^)]+)\)/g, '$1^{ $2 }') // x^y
    .replace(/Math\.sqrt\(([^)]+)\)/g, '\\sqrt{ $1 }')
    .replace(/Math\.cbrt\(([^)]+)\)/g, '\\sqrt[3]{ $1 }')
    .replace(/Math\.log10\(([^)]+)\)/g, '\\log( $1 )')
    .replace(/Math\.log\(([^)]+)\)/g, '\\ln( $1 )')
    .replace(/Math\.sin\(([^)]+)\)/g, '\\sin( $1 )')
    .replace(/Math\.cos\(([^)]+)\)/g, '\\cos( $1 )')
    .replace(/Math\.tan\(([^)]+)\)/g, '\\tan( $1 )')
    .replace(/Math\.asin\(([^)]+)\)/g, '\\sin^{-1}( $1 )')
    .replace(/Math\.acos\(([^)]+)\)/g, '\\cos^{-1}( $1 )')
    .replace(/Math\.atan\(([^)]+)\)/g, '\\tan^{-1}( $1 )');

  eqnDisplay.innerHTML = `\\(${displayEquation}\\)`;
  MathJax.typesetPromise([eqnDisplay]);
}


// BUTTON CLICK HANDLER

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;

    // ---------- AC ----------
    if (value === 'AC') {
      currentEquation = '';
      eqnDisplay.textContent = '';
      ansDisplay.textContent = '';
      return;
    }

    // ---------- DEL ----------
    if (value === 'DEL') {
      currentEquation = currentEquation.slice(0, -1);
      renderEquation();
      return;
    }

    // ---------- CALC / = ----------
    if (value === '=' || value === 'CALC') {
      try {
        let evalEquation = currentEquation.replace(/Ans/g, lastAnswer);
        lastAnswer = eval(evalEquation);
        ansDisplay.textContent = lastAnswer;
      } catch (error) {
        ansDisplay.textContent = 'Syntax Error';
      }
      return;
    }

    // ---------- ANS ----------
    if (value === 'Ans') {
      currentEquation += 'Ans';
      renderEquation();
      return;
    }

    // ---------- SCI BUTTONS ----------
    handleSciFunctions(value);

    // ---------- NORMAL BUTTONS ----------
    if (
      ![
        'inv',
        'log(',
        'pie',
        'x/y',
        'cube-root',
        'x**2',
        'sin(',
        'cos(',
        'tan(',
        'sin-inv',
        'cos-inv',
        'tan-inv',
        'ln(',
      ].includes(value)
    ) {
      currentEquation += value;
      renderEquation();
    }
  });
});

// -------------------------------
// SCIENTIFIC FUNCTION HANDLER

function handleSciFunctions(func) {
  const num = currentEquation.trim() || lastAnswer;

  switch (func) {
    case 'inv':
      currentEquation = `(${num})**-1`;
      break;

    case 'log(':
      currentEquation = `Math.log10(${num})`;
      break;

    case 'ln(':
      currentEquation = `Math.log(${num})`;
      break;

    case 'cube-root':
      currentEquation = `Math.cbrt(${num})`;
      break;

    case 'x**2':
      // Insert Math.pow with empty exponent
      currentEquation = `(${num})**2`;
      break;

    case 'pie':
      currentEquation += `Math.PI`;
      break;

    case 'sin(':
      currentEquation = `Math.sin(${num})`;
      break;

    case 'cos(':
      currentEquation = `Math.cos(${num})`;
      break;

    case 'tan(':
      currentEquation = `Math.tan(${num})`;
      break;

    case 'sin-inv':
      currentEquation = `Math.asin(${num})`;
      break;

    case 'cos-inv':
      currentEquation = `Math.acos(${num})`;
      break;

    case 'tan-inv':
      currentEquation = `Math.atan(${num})`;
      break;

    case 'x/y':
      currentEquation = `(${num})/`;
      break;

    default:
      break;
  }

  renderEquation();
}
