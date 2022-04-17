const DateTime = luxon.DateTime;
const Interval = luxon.Interval;

const loadEvents = () => {
  for (let i = 8; i <= 18; i++) {
    const textAreaId = i;
    const textAreaText = localStorage.getItem(textAreaId);
    $(`textarea#${textAreaId}`).val(textAreaText);
  }
}

$('#currentDay').text(DateTime.local().toFormat('DDDD'));
$('#currentTime').text(DateTime.local().toFormat('tt'));

timeBlockHr = 8;

while (timeBlockHr <= 18) {
  const timeBlock = DateTime.local()
  .set({hour: timeBlockHr, minute: 0});
  
  const timeBlockHrEl = `<div class="hour">${timeBlock.toFormat('h a')}</div>`;
  const timeBlockContent = `<textarea class="description" id="${timeBlockHr}"></textarea>`;
  const timeBlockBtn = `<button class="saveBtn" id="${timeBlockHr}"><i>Save</i></button>`;
  const timeBlockRow = `<div class="row">${timeBlockHrEl}${timeBlockContent}${timeBlockBtn}</div>`;
  
  $('<div>').attr('id', 'time-block-' + timeBlockHr)
  .append(timeBlockRow)
  .appendTo('#time-blocks');
  
  $('textarea.description').on('click', () => {
    $('<form>').attr('id', 'textarea-form')
  });
  
  $(`button#${timeBlockHr}.saveBtn`).on('click', function() {
    console.log( $( this ).text() )
    const eventHour = $(this).attr('id');
    const eventDescr = $(`textarea#${eventHour}`).val();
    localStorage.setItem(eventHour, eventDescr);
  });
  
  timeBlockHr++;

  if (DateTime.local().hasSame(timeBlock, 'hour')) {
    $('.description').addClass('present');
  } else if (DateTime.local() < timeBlock.startOf('hour')) {
    $('.description').addClass('future');
  } else {
    $('.description').addClass('past');
  }
}

loadEvents();