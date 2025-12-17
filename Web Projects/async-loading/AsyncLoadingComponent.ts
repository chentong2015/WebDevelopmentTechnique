// @ts-ignore
import {of} from "rxjs/internal/observable/of";
// @ts-ignore
import {shareReplay} from "rxjs/operators";

// @ts-ignore
class AsyncLoadingComponent implements OnInit, AfterViewInit, OnDestroy {

    // TODO. 在当前View页面存储缓存数据
    // @ts-ignore
    private statsCache = new Map<string, Observable<ImportStatsModel>>();

    ngAfterViewInit(): void {
    }

    // TODO. 只有在组件真正被销毁时才执行, 并非View页面跳转 ?
    ngOnDestroy(): void {
        this.statsCache.clear();
    }

    // TODO. 后端API执行数据的计算需要一定的时间
    // @ts-ignore
    public getStats(workflowExecutionPublicId: string): Observable<ImportStatsModel> {
        if (!workflowExecutionPublicId) {
            return of({ conflictCount: 0, errorCount: 0, warningCount: 0 });
        }

        // 判断缓存中是否存在，反之获取新数据并添加到缓存中
        if (this.statsCache.has(workflowExecutionPublicId)) {
            return this.statsCache.get(workflowExecutionPublicId)!;
        }

        // 请求需要显式处理Timeout Error
        // @ts-ignore
        // const stats$ = defer(() =>
        //     this.importHttpService.findStats(id).pipe(
        //         timeout(60000),
        //         map(res => res.body!),
        //         retry(5),
        //         catchError(err => {
        //             this.statsCache.delete(id);
        //             因为请求失败, 默认数据不是正确数据, 不应该返回 !!
        //             return of({ conflictCount: 0, errorCount: 0, warningCount: 0 });
        //         })
        //     )
        // ).pipe(shareReplay(1));

        // shareReplay要搭配catchError否则timeout会被永久缓存
        // 异常时stats$会变成error Observable数据
        this.statsCache.set(workflowExecutionPublicId, stats$);
    }

    // TODO. 错误请求模板:
    // - 没有retry重请求考虑
    // - 没有timeout处理
    // - 没有error异常返回处理:
    //   只要请求出现一次异常，结果状态将存储到cache中
    //   页面无法加载且始终处于loading状态
    //   缓存中的数据不会因为页面切换而被清除 ?
    // const stats$ = this.importHttpService.findStats(workflowExecutionPublicId)
    //   .pipe(map(res => res.body!),
    //       takeUntil(this.unsubscribe$),
    //       shareReplay(1)
    //   );
}