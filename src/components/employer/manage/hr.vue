<template>
    <div>
        <CRow>
            <CCol col="12" sm="6" lg="3">
                <div class="card">
                    <div class="card-body p-3 d-flex align-items-center">
                      <div class="bg-warning px-2 py-1 mfe-3" style="font-size:1.3rem">
                        <i class="fas fa-wallet"></i>
                      </div>
                      <div>
                        <div class="text-value text-primary">&#8369; </div>
                        <div class="text-muted text-uppercase font-weight-bold small">Total Payout</div>
                      </div>
                    </div>
                </div>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <div class="card">
                    <div class="card-body p-3 d-flex align-items-center">
                      <div class="bg-warning px-2 py-1 mfe-3" style="font-size:1.3rem">
                        <i class="fas fa-clock"></i>
                      </div>
                      <div>
                        <div class="text-value text-primary"> hour(s)</div>
                        <div class="text-muted text-uppercase font-weight-bold small">Total Hour(s)</div>
                      </div>
                    </div>
                </div>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <div class="card">
                    <div class="card-body p-3 d-flex align-items-center">
                      <div class="bg-warning px-2 py-1 mfe-3" style="font-size:1.3rem">
                        <i class="fas fa-stopwatch"></i>
                      </div>
                      <div>
                        <div class="text-value text-primary"></div>
                        <div class="text-muted text-uppercase font-weight-bold small">Rendering Time</div>
                      </div>
                    </div>
                </div>
            </CCol>
        </CRow>
        <CRow>
            <CCol col="12" sm="12">
                <CCard>
                    <CCardBody>
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="changeTab(0)">Attendance</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="changeTab(1)">Leaves</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" @click="changeTab(2)">Payroll</a>
                            </li>
                        </ul>
                        <div class="p-4">
                            <div class="">

                            </div>
                        </div>
                    </CCardBody>
                </CCard>
                    <!-- <CCard>
                        <CCardHeader>
                                TItle
                                <div class="card-header-actions">
                                    <button v-if="tab==0" @click="start(1)" class="btn btn-primary btn-sm">Start</button>
                                    <button v-if="tab==1" @click="stop(0)" class="btn btn-danger btn-sm">Stop</button>
                                </div>
                        </CCardHeader>
                        <CCardBody>
                            <PlaceholderTb :show="JSON.stringify(show)"/>
                            <table v-if="!show.isShown" class="table table-striped">
                                <thead>
                                    <th>Started</th>
                                    <th>Ended</th>
                                    <th>Rendered Time</th>
                                    <th v-if="details.paymentType == 1">Payout</th>
                                </thead>
                                <tbody v-if="hasData">
                                    <tr v-for="(log, index) in logs" :key="index">
                                        <td>{{log.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                                        <td>{{log.updated_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                                        <td>{{log.time_stepped}} hour(s)</td>
                                        <td v-if="details.paymentType == 1">&#8369; {{log.pays}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr><td colspan="100" class="text-center">No Result</td></tr>
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard> -->
            </CCol>
        </CRow>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>