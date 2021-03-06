import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { serverUrl } from '../config';
import * as moment from 'moment';

@Injectable()
export class TablesService {
  weiboData: any = [];
  suerData: any = [];
  weibo_title: string = '';
  // 热搜
  searchTotal: number = 0;
  searchData: any = [];
  searchTotalPage: number = 0;
  searchLoading: boolean = false;

  // 成员
  userList: any = [];

  currentMenu: number = 1;
  constructor(private requestService: RequestService) {
    this.userList = [{
      userName: '杨超越',
      key: 3
    }, {
      userName: '孟美岐',
      key: 1
    }, {
      userName: '吴宣仪',
      key: 2
    }, {
      userName: '段奥娟',
      key: 4
    }, {
      userName: 'Yamy',
      key: 5
    }, {
      userName: '赖美云',
      key: 6
    }, {
      userName: '紫宁',
      key: 7
    }, {
      userName: '杨芸晴',
      key: 8
    }, {
      userName: '李紫婷',
      key: 9
    }, {
      userName: '傅菁',
      key: 10
    }, {
      userName: '徐梦洁',
      key: 11
    }
    ]
  }
  public async getWeiboData(weekFliter: string, userNum: string) {
    let res = await this.requestService.queryServer({ url: `${serverUrl}/day/${weekFliter}/${userNum}`, method: 'get' }, {});
    let weiboData = [];
    console.log(res)
    res.list.forEach(element => {
      weiboData.push({
        create_date: moment.unix(element.create_date).format('MM-DD'),
        weibo_read: element.weibo_read,
        weibo_int: element.weibo_int,
        weibo_love: element.weibo_love
      })
    });
    this.weibo_title = res.list[0].weibo_total.title;
    this.weiboData = weiboData;
  }

  public async getWeiboInfo(userNum: string) {
    let res = await this.requestService.queryServer({ url: `${serverUrl}/hour/month/${userNum}`, method: 'get' }, {});
    let suerData = [];
    res.list.forEach(element => {
      suerData.push({
        create_date: moment.unix(element.create_date).format('MM-DD'),
        super_rank: element.super_rank,
        super_fans: element.super_fans,
        super_read: element.super_read,
        doki_fans: element.doki_fans
      })
    });
    this.suerData = suerData;
  }

  public async getHotSearch(page: number, name: string) {
    let encode = encodeURI(name)
    let hotUrl = `/api/getHotSearch`
    let res = await this.requestService.queryServer({ url: hotUrl, method: 'get' }, { page: page, name: encode });
    let data = JSON.parse(res.data);
    this.searchTotal = data.total;
    this.searchTotalPage = Math.ceil(data.total / 20)
    setTimeout(() => {
      data.rows.forEach(element => {
        this.searchData.push({
          firstRankingTime: moment.unix(element.firstRankingTime).format('YYYY-MM-DD'),
          keywords: element.keywords,
          searchNums: element.searchNums,
          topRanking: element.topRanking,
          duration: this.secondToDate(element.duration)
        });
      });
      this.searchLoading = false;
    }, 500);
  }

  secondToDate(result) {
    var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result = h + "小时" + m + "分";
  }

}
