const arr = [72, 54, 58, 30, 31, 78, 2, 77, 82, 72];
const arr1 = [72, 54, 58, 30, 31, 78, 2, 77, 82, 72];
const arr2 = [72, 54, 58, 30, 31, 78, 2, 77, 82, 72];
const arr3 = [72, 54, 58, 30, 31, 78, 2, 77, 82, 72];
const arr4 = [61, 85, 19, 88, 68, 8, 70, 29];
// 冒泡排序
function bubble(arry) {
  const length = arr.length;
  const start = new Date().valueOf();
  for (let i = length - 1; i > 1; i--) {
    for (let j = 0; j < i; j++) {
      if (arry[j] > arry[j + 1]) {
        // 左右交换
        [arry[j], arry[j + 1]] = [arry[j + 1], arry[j]];
      }
    }
    console.log(i, arry);
  }
  const end = new Date().valueOf();
  console.log(end - start);
}
// bubble(arr);

// 选择排序
// 选择排序会用到嵌套循环。外循环从数组的第一个元素移动到倒数第二个元素;
// 内循环从第 二个数组元素移动到最后一个元素，查找比当前外循环所指向的元素小的元素。
// 每次内循环 迭代后，数组中最小的值都会被赋值到合适的位置。
function selection(arry) {
  const length = arry.length;
  const start = new Date().valueOf();
  for (let i = 0; i < length - 1; i++) {
    let min = i;
    // 查找i及以后的 最小数的索引 注意j从i+1开始
    for (let j = i + 1; j < length; j++) {
      if (arry[j] < arry[min]) {
        min = j;
      }
    }
    // 左右交换
    [arry[i], arry[min]] = [arry[min], arry[i]];
    console.log(i, arry);
  }
  const end = new Date().valueOf();
  console.log(end - start);
}
// selection(arr1);

// 插入排序
// 外循环将数组元素挨个移动，而内循环则对外循环中选中的元素及 它后面的那个元素进行比较。
// 如果外循环中选中的元素比内循环中选中的元素小，那么数 组元素会向右移动
function insertionSort(dataStore) {
  console.log('dataStore', dataStore);
  var temp, inner;
  for (var outer = 1; outer < dataStore.length; ++outer) {
    temp = dataStore[outer];
    inner = outer;
    while (inner > 0 && (dataStore[inner - 1] >= temp)) {
      // 右移操作
      dataStore[inner] = dataStore[inner - 1];
      --inner;
    }
    // 最终将外层循环的索引处的值 temp 赋到排序好的位置处
    // 即: inner-1 处的元素 <= temp inner+1 元素 >= temp
    dataStore[inner] = temp;
    console.log('outer', dataStore);
  }
}
// insertionSort(arr2);
// 插入排序for循环的实现
function insertion(dataStore) {
  console.log('======================================================');
  var temp, inner;
  for (var i = 1; i < dataStore.length; ++i) {
    temp = dataStore[i];
    let j = i;
    for (j; j > 0 && dataStore[j - 1] >= temp; j--) {
      dataStore[j] = dataStore[j - 1];
      console.log('i', i, 'temp', temp, 'j', j, dataStore);
    }
    dataStore[j] = temp;
    console.log('outer', dataStore);
  }
}
// insertion(arr3)

// 希尔排序
// 插入排序的升级（比插入排序 增多了比较间隔）
const gaps = [3, 2, 1]; // 比较间隔
function shellsort(gaps, dataStore) {
  for (var g = 0; g < gaps.length; ++g) {
    for (var i = gaps[g]; i < dataStore.length; ++i) {
      var temp = dataStore[i];
      for (var j = i; j >= gaps[g] && dataStore[j - gaps[g]] > temp;j -= gaps[g]) {
        dataStore[j] = dataStore[j - gaps[g]];
      }
      dataStore[j] = temp;
    }
    console.log(dataStore);
  }
}
shellsort(gaps, arr4);

// 快速排序
// (1) 选择一个基准元素，将列表分隔成两个子序列;
// (2) 对列表重新排序，将所有小于基准值的元素放在基准值的前面，所有大于基准值的元
// 素放在基准值的后面;
// (3) 分别对较小元素的子序列和较大元素的子序列重复步骤 1 和 2。

function fast(arry) {
  const left = [];
  const right = [];
  if(arry.length < 1) {
    return [];
  }
  for(let i = 1; i < arry.length; i++) {
    if (arry[i] > arry[0]) {
      right.push(arry[i]);
    } else {
      left.push(arry[i]);
    }
  }
  return fast(left).concat(arry[0], fast(right));
  
}
// [].conc
const result = fast(arr3);
console.log(result);