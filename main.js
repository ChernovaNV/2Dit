
// Task 1 Accordion

const accordionCol = document.getElementById('accordionsCol')
const accordionButtons = accordionCol.querySelectorAll('.accordion__button');
const accordionContents = accordionCol.querySelectorAll('.accordion__content');

accordionButtons.forEach(btn => btn.addEventListener('click', () => {
    // получение контента нажатой кнопки
    const currentContent = accordionCol.querySelector('#' + btn.dataset.tab);

    // закрытие текущего аккордеона, если он был нажат повторно
    if(currentContent.classList.contains('active')) {
        currentContent.classList.remove('active');
        btn.classList.remove('active');
        
    } else {
        // поиск и закрытие предыдущего аккордеона
        accordionContents.forEach(item => item.classList.remove('active'));
        accordionButtons.forEach(item => item.classList.remove('active'));

        // открытие аккордеона, на который был совершен клик
        btn.classList.add('active');
        currentContent.classList.add('active');
    }
}))

// Task 3 Adaptive blog --------------------------------------------------

const blog = document.querySelector('.blog')
const articles = blog.querySelectorAll('.article');
const counters = blog.querySelectorAll('.article__counter');

//функция порядковой нумерации статей в блоге
function articleNumbering() {
    articles.forEach((article, i) => {
        
        if(i < 9)  {
            return counters[i].innerText = `.0${++i}`;
        }
        return counters[i].innerText = `.${++i}`;
    })
}
articleNumbering()

// Task 4 Form ------------------------------------------------------------

const form = document.getElementById('form');
const inputsForm = form.querySelectorAll('input');
const formSubmit = form.querySelector('.form__btn');

const emailReg = /[0-9a-zA-Z]{1,}\@[0-9a-zA-Z]{1,}\.[a-z]{1,}/;
let flag = {};

// библиотека автоматического форматирования номера телефона
const numberPatterns = [
    '+7 (NNN) NNN-NN-NN',  // Россия и Казахстан
  ];
  document.querySelectorAll( 'input[type=tel]' ).forEach( function( input ) {
    const formatterObject = new Freedom.PhoneFormatter( numberPatterns );
    formatterObject.attachToInput( input );
} );

inputsForm.forEach(input => input.addEventListener('input', () => {
    let valid = false;
    input.classList.add('form__input--invalid')

    switch(input.name) {
      case 'username':
        valid = (input.value.length > 2) ?  true :  false;
        break;
      case 'usertel':
        valid = (input.value.length === 18) ?  true :  false;
        break;
      case 'useremail':
        valid = (emailReg.test(input.value)) ?  true :  false;
        break;
      default:
        break;
    }

    if(valid) {
      input.classList.remove('form__input--invalid');
      flag[input.name] = true
    } else {
      flag[input.name] = false
    }
    if(inputsForm.length == Object.keys(flag).length && Object.values(flag).every(item => item == true)) {
      formSubmit.disabled = false
    }
}))



function validationForm(form) {
   for(input of inputsForm) {
        if(input.value === '' || input.classList.contains('form__input--invalid')) {
            return false;
        }
        return true
   }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(validationForm(form)) {
        console.log('true');
       formSubmit.disabled = false
    } else {
        formSubmit.disabled = true
        console.log('false');
    }
})

// Task 5 Charts ----------------------------------------------
const colorsGradients = [['#E83C46', '#9D121A'], ['#F9A620', '#DD9622'], ['#474444', '#262424'], ['#005FA7', '#005FA7'], ['#808080', '#676767']];
const chartWidth = document.querySelector('.chart__card').getBoundingClientRect().width;
let textInner;

// данные для диаграмм
const chartsData = [
  {
    id: 'myChart',
    title: 'Страны',
    values: [533, 372, 160],
    text: '335',
    labels: ['Россия', 'Казахстан', 'Узбекистан'],
    inits: 'шт.'
  },
  {
    id: 'myChart2',
    title: 'Города',
    values: [160, 372, 170, 198, 165],
    text: '1065',
    labels: ['Тюмень', 'Нур-Султан', 'Ташкент', 'Петербург', 'Алма-Аты'],
    inits: 'шт.'
  },
  {
    id: 'myChart3',
    title: 'Страны',
    values: [65, 45, 20],
    text: '$ 130',
    labels: ['Россия', 'Казахстан', 'Узбекистан'],
    inits: 'млн.'
  },
  {
    id: 'myChart4',
    title: 'Города',
    values: [20, 45, 22, 24, 19],
    text: '$ 335',
    labels: ['Тюмень', 'Нур-Султан', 'Ташкент', 'Петербург', 'Алма-Аты'],
    inits: 'млн.'
  }
]

// Создание Диаграмм ---------------
chartsData.forEach(chartData => {
  let ctx = document.getElementById(chartData.id);
  let context = ctx.getContext('2d');

  // Текст внутри диаграммы
  const doughnutText = {
    id: 'doughnutText',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {ctx, data} = chart;

      ctx.save();
      // Определение координат центра
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;  
      // Создания текста внутри диаграммы
      function text(fontWeight, fontSize, text, x, y) {
        ctx.font = `${fontWeight} ${fontSize}px Mail Sans Roman`;
        ctx.fillstyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
      }

      if(chartData.inits === 'млн.') {
        text('bold', 38, '$' , xCoor - 40, yCoor)
        text('bold', 38, textInner, xCoor + 10, yCoor)
      } else {
        text('bold', 38, textInner, xCoor, yCoor)
      }
      text('normal', 16, chartData.inits, xCoor, yCoor + 25)
    }
  }
  // Создание легенды
  const createListElements = (item) => {
    const li = document.createElement('li');
    const marker = document.createElement('span');
    const textContainer = document.createElement('p');
    const text = document.createTextNode(item.text);

    li.classList.add('list__item');
    marker.classList.add('list__marker');
    textContainer.classList.add('list__text');
    const label = `
        <span class="list__marker"></span>
        <p class="list__text">${item.text}</p>
    `
    marker.style.backgroundColor = colorsGradients[item.index][0];
    textContainer.appendChild(text);
    li.appendChild(marker);
    li.appendChild(textContainer);
    return {li, marker, textContainer};
  }

  // clickHandler
  const clickHandler = (chart, list, li, data, segment, index) => {
    list.querySelectorAll('.list__item').forEach(elem => elem.classList.remove('list__active'));

    textInner = chartData.values.reduce((accum, item) => accum + item);

    data.forEach(item => {
      item.options.borderWidth = 0
      item.options.offset = 0;
    })
    if(segment._active) {
      segment.borderWidth = 0
      segment.offset = 0 
      segment._active = false;  
    
    } else {
      segment._active = true;
      segment.borderWidth = 7
      segment.offset = 13
      li.classList.add('list__active')
      textInner = chartData.values[index]
    }
    chart.draw();
  }

  // Легенда
  const clickPlugin = {
    id: 'clickPlugin',
    afterUpdate(chart, args, options) {
      const list = document.getElementById(`${chartData.id}-legends`);
      
      // Удаление старой легенды
      while(list.firstChild) {
        list.firstChild.remove();
      }

      // Добавление элементов легенды в html, обработка клика на легенде и сегменте диаграммы
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach(item => {
        const data = chart.getDatasetMeta(0).data
        const segment = data[item.index].options;

        let {li, marker, text } = createListElements(item);
        list.append(li)

        li.onclick = () => {
          clickHandler(chart, list, li, data, segment, item.index);
        }

        chart.options.onClick = (evn, item) => {
          li = list.querySelectorAll('.list__item');
          clickHandler(evn.chart, list, li[item[0].index], data, item[0].element.options, item[0].index);
        }
      })
    }
  }

  textInner = chartData.values.reduce((accum, item) => accum + item)

  //Создание градиента
  let gradients = colorsGradients.reduce(((res, color) => {
    let gradient = context.createLinearGradient(0, 0, chartWidth, 0);
    gradient.addColorStop(0, color[0]);
    gradient.addColorStop(1, color[1]);
    return [...res, gradient];
  }), [])
  
  // setup
  const data = {
    labels: chartData.labels,
    datasets: [{
      data: chartData.values,
      backgroundColor: gradients,
      borderColor: gradients,
      rotation: -90,
      borderJoinStyle: 'miter',
      cutout: '80%',
      hoverOffset: 13,
      hoverBorderWidth: 7,
      hoverBorderJoinStyle: 'miter',
      hoverBorderColor: gradients,
    }] 
  };

  const config = {
    type: 'doughnut',
    label: chartData.title,
    data: data,
    options: {
      events: ['click'],
      layout: {
        padding: 10
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          font: 'medium 14px Mail Sans Roman',
          align: 'start',
          display: true,
          text: chartData.title,
        },
        tooltip: {
          enabled: false,
        }
      },
    },
    plugins: [doughnutText, clickPlugin],
  };

  let myChart = new Chart(ctx, config)
})