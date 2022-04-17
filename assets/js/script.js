const DateTime = luxon.DateTime;
const Interval = luxon.Interval;

$('#currentDay').text(DateTime.local().toFormat('DDDD'));
$('#currentTime').text(DateTime.local().toFormat('tt'));

const startHr = DateTime.local().set({hour: 8, minute: 0});
const endHr = DateTime.local().set({hour: 18, minute: 0});
const interval = Interval.fromDateTimes(startHr, endHr);


timeBlockHr = 8;

while (timeBlockHr < 19) {
  const timeBlock = DateTime.local()
  .set({hour: timeBlockHr, minute: 0})
  .toFormat('h a');
  
  const timeBlockHrEl = `<div class="hour">${timeBlock}</div>`;
  const timeBlockContent = `<textarea class="description" id="${timeBlockHr}"></textarea>`;
  const timeBlockBtn = `<button class="saveBtn" id="${timeBlockHr}"><i>Save</i></button>`;
  const timeBlockRow = `<div class="row">${timeBlockHrEl}${timeBlockContent}${timeBlockBtn}</div>`;

  $('<div>').attr('id', `time-block-` + timeBlockHr)
  .append(timeBlockRow)
  .appendTo('#time-blocks');
  timeBlockHr++;
}
  
$(`#${timeBlockId}`).on('click', function() {
  const textAreaId = $(this).attr('id');
  const textAreaText = $(`#${textAreaId}`).val();
  localStorage.setItem(textAreaId, textAreaText);
});
