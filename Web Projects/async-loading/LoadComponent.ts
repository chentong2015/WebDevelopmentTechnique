// @ts-ignore
import {of} from "rxjs/internal/observable/of";
// @ts-ignore
import {shareReplay} from "rxjs/operators";

// @ts-ignore
class ImportDatagridComponent implements OnInit, AfterViewInit, OnDestroy {

    // TODO. 在当前View页面存储缓存数据
    // @ts-ignore
    private statsCache = new Map<string, Observable<ImportStatsModel>>();

    ngAfterViewInit(): void {
    }

    // TODO. View页面销毁时清除缓存
    ngOnDestroy(): void {
        this.statsCache.clear();
    }

    // TODO. 判断缓存中是否存在，反之获取新数据并添加到缓存中
    // @ts-ignore
    public getStats(workflowExecutionPublicId: string): Observable<ImportStatsModel> {
        if (!workflowExecutionPublicId) {
            return of({ conflictCount: 0, errorCount: 0, warningCount: 0 });
        }
        if (this.statsCache.has(workflowExecutionPublicId)) {
            return this.statsCache.get(workflowExecutionPublicId)!;
        }

        // 后端API执行数据的计算需要一定的时间
        // @ts-ignore
        // const stats$ = this.importHttpService.findStats(workflowExecutionPublicId)
        //     .pipe(map(res => res.body!),
        //         takeUntil(this.unsubscribe$),
        //         shareReplay(1)
        //     );
        this.statsCache.set(workflowExecutionPublicId, stats$);
    }
}



